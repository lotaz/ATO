import { Add, Remove } from "@mui/icons-material";
import MoneyIcon from "@mui/icons-material/Money";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { OrderType, PaymentStatus, PaymentType } from "constants/order-enums";
import { useAppContext } from "contexts/AppContext";
import { get, post } from "helpers/axios-helper";
import { currency } from "lib";
import { useRouter } from "next/router";
import CheckoutForm from "pages-sections/checkout/CheckoutForm";
import { useEffect, useLayoutEffect, useState } from "react";
import paymentService from "services/payment.service";
import { enqueueSnackbar } from "notistack";

const Cart = () => {
  const { state } = useAppContext();
  const cartList = state.cart;
  const [groupShippingFees, setGroupShippingFees] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useLayoutEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const calculateShippingFee = async (address) => {
    if (!address) return;
    try {
      const feePromises = Object.entries(groupedProducts).map(
        async ([facilityId, group]) => {
          const totalWeight = group.products.reduce(
            (acc, item) => acc + (item.product?.weight || 0) * item.qty,
            0
          );
          const response = await post("/tourist/order/calculate-shipping-fee", {
            toWardCode: address.toWardCode,
            toDistrictId: address.toDistrictId,
            weight: totalWeight || 15, // Default weight if not specified
          });
          return [facilityId, response.data?.data?.total || 0];
        }
      );

      const fees = await Promise.all(feePromises);
      const feesObject = Object.fromEntries(fees);
      setGroupShippingFees(feesObject);

      // Calculate total shipping fee
      const totalFee = Object.values(feesObject).reduce(
        (acc, fee) => acc + fee,
        0
      );
      setShippingFee(totalFee);
    } catch (error) {
      console.error("Failed to calculate shipping fees:", error);
    }
  };

  // Add handler for select all
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    const newSelected = {};
    Object.entries(groupedProducts).forEach(([facilityId, group]) => {
      newSelected[facilityId] = {
        selected: checked,
        products: group.products.reduce((acc, item) => {
          acc[item.id] = checked;
          return acc;
        }, {}),
      };
    });
    setSelectedProducts(newSelected);
  };

  // Add handler for facility selection
  const handleSelectFacility = (facilityId, checked) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [facilityId]: {
        selected: checked,
        products: groupedProducts[facilityId].products.reduce((acc, item) => {
          acc[item.id] = checked;
          return acc;
        }, {}),
      },
    }));
  };

  // Add handler for individual product selection
  const handleSelectProduct = (facilityId, productId, checked) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [facilityId]: {
        ...prev[facilityId],
        products: {
          ...(prev[facilityId]?.products || {}),
          [productId]: checked,
        },
      },
    }));
  };

  // Update getTotalPrice to only count selected products
  const getTotalPrice = () => {
    let total = 0;
    Object.entries(groupedProducts).forEach(([facilityId, group]) => {
      group.products.forEach((item) => {
        if (selectedProducts[facilityId]?.products?.[item.id]) {
          total += item.price * item.qty;
        }
      });
    });

    const totalShippingFee = Object.entries(groupShippingFees).reduce(
      (acc, [facilityId, fee]) => {
        if (selectedProducts[facilityId]?.selected) {
          return acc + fee;
        }
        return acc;
      },
      0
    );
    return total + totalShippingFee;
  };

  // Group products by tourist facility
  const groupedProducts = cartList.reduce((groups, item) => {
    const facilityId = item?.product?.touristFacilityId || "other";
    if (!groups[facilityId]) {
      groups[facilityId] = {
        facilityName:
          item.product?.touristFacility?.touristFacilityName || "Khác",
        products: [],
        selected: false,
      };
    }
    groups[facilityId].products.push(item);
    return groups;
  }, {});

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState(PaymentType.Transfer);

  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [ids, setIds] = useState([]);

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await get("tourist/address");
        setAddresses(response.data || []);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  // Handle address selection
  const handleAddressSelect = (address) => {
    setSelectedAddressId(address.shipAddressId);
    calculateShippingFee(address);
  };

  // Update handleCheckout function
  const handleCheckout = async () => {
    const hasSelectedProducts = Object.values(selectedProducts).some(
      (facility) =>
        Object.values(facility.products).some((selected) => selected)
    );

    if (!hasSelectedProducts) {
      alert("Vui lòng chọn ít nhất một sản phẩm");
      return;
    }

    if (!selectedAddressId) {
      alert("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    try {
      const orderDetails = [];
      Object.entries(groupedProducts).forEach(([facilityId, group]) => {
        group.products.forEach((item) => {
          if (selectedProducts[facilityId]?.products?.[item.id]) {
            orderDetails.push({
              ProductId: item.id,
              Quantity: item.qty,
              UnitPrice: item.price,
              FacilityId: facilityId,
            });
          }
        });
      });

      const orderRequest = {
        OrderType: OrderType.Online,
        PaymentType: paymentMethod,
        PaymentStatus: PaymentStatus.UnPaid,
        OrderDetails: orderDetails,
        ShipAddressId: selectedAddressId,
        ShippingFee: shippingFee,
        TotalAmount: getTotalPrice(),
      };

      const response = await paymentService.createOrder(orderRequest);
      router.push(response);

      if (response?.status === 200) {
        orderDetails.forEach((orderDetail) => {
          console.log("orderDetail", orderDetail);
          dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
              id: orderDetail.ProductId,
              qty: 0,
            },
          }); // SHOW ALERT PRODUCT ADDED OR REMOVE
        });
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Đặt hàng thất bại. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    const orderDetails = [];
    Object.entries(groupedProducts).forEach(([facilityId, group]) => {
      group.products.forEach((item) => {
        if (selectedProducts[facilityId]?.products?.[item.id]) {
          orderDetails.push({
            ProductId: item.id,
            Quantity: item.qty,
            UnitPrice: item.price,
            FacilityId: facilityId,
          });
        }
      });
    });
    const ids = orderDetails.map((orderDetail) => orderDetail.ProductId);

    sessionStorage.setItem("ids", JSON.stringify(ids));
  }, [groupedProducts]);

  return (
    <CheckoutNavLayout>
      {cartList.length > 0 ? (
        <Box sx={{ minHeight: "100vh" }}>
          <Grid container spacing={2}>
            {/* Cart Header */}
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <FlexBox alignItems="center">
                  <Checkbox
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  <Typography sx={{ flex: 2 }}>Sản Phẩm</Typography>
                  <Typography
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    Đơn Giá
                  </Typography>
                  <Typography
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    Số Lượng
                  </Typography>
                  <Typography
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    Số Tiền
                  </Typography>
                  <Typography
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    Thao Tác
                  </Typography>
                </FlexBox>
              </Card>
            </Grid>

            {/* Product Groups */}
            <Grid item xs={12}>
              {Object.entries(groupedProducts).map(([facilityId, group]) => (
                <Card key={facilityId} sx={{ mb: 2 }}>
                  {/* Facility Header */}
                  <FlexBox
                    sx={{ p: 2, borderBottom: "1px solid #f5f5f5" }}
                    alignItems="center"
                  >
                    <Checkbox
                      checked={selectedProducts[facilityId]?.selected || false}
                      onChange={(e) =>
                        handleSelectFacility(facilityId, e.target.checked)
                      }
                    />
                    <Typography fontWeight="600">
                      {group.facilityName}
                    </Typography>
                  </FlexBox>

                  {/* Products */}
                  {group.products.map((item) => (
                    <CartProductCard
                      key={item.id}
                      item={item}
                      facilityId={facilityId}
                      selectedProducts={selectedProducts}
                      handleSelectProduct={handleSelectProduct}
                    />
                  ))}
                </Card>
              ))}
            </Grid>

            {/* Cart Footer */}

            <Grid item xs={12}>
              <Card sx={{ p: 3, mb: 2 }}>
                {/* Payment Method */}
                <Box>
                  <FlexBox alignItems="center" mb={2}>
                    <PaymentIcon sx={{ color: "primary.main", mr: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                      Phương thức thanh toán
                    </Typography>
                  </FlexBox>
                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup defaultValue={PaymentType.Transfer}>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(auto-fit, minmax(110px, 1fr))",
                          },
                          gap: 2,
                        }}
                      >
                        <Card
                          sx={{
                            p: 2,
                            height: 110,
                            border: "1px solid",
                            borderColor:
                              paymentMethod === PaymentType.CashOnDelivery
                                ? "primary.main"
                                : "grey.300",
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s",
                            "&:hover": { borderColor: "primary.main" },
                          }}
                          onClick={() =>
                            setPaymentMethod(PaymentType.CashOnDelivery)
                          }
                        >
                          <FormControlLabel
                            value={PaymentType.CashOnDelivery}
                            control={<Radio />}
                            label={
                              <Box>
                                <FlexBox alignItems="center" gap={1}>
                                  <MoneyIcon color="primary" />
                                  <Typography fontWeight={600}>
                                    Thanh toán khi nhận hàng (COD)
                                  </Typography>
                                </FlexBox>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  mt={1}
                                >
                                  Thanh toán bằng tiền mặt khi nhận hàng
                                </Typography>
                              </Box>
                            }
                          />
                        </Card>

                        <Card
                          sx={{
                            p: 2,
                            height: 110,
                            border: "1px solid",
                            borderColor:
                              paymentMethod === PaymentType.Transfer
                                ? "primary.main"
                                : "grey.300",
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s",
                            "&:hover": { borderColor: "primary.main" },
                          }}
                          onClick={() => setPaymentMethod(PaymentType.Transfer)}
                        >
                          <FormControlLabel
                            value={PaymentType.Transfer}
                            control={<Radio />}
                            label={
                              <Box>
                                <FlexBox alignItems="center" gap={1}>
                                  <PaymentIcon color="primary" />
                                  <Typography fontWeight={600}>
                                    Thanh toán qua VNPay
                                  </Typography>
                                </FlexBox>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  mt={1}
                                >
                                  Thanh toán an toàn với VNPay
                                </Typography>
                              </Box>
                            }
                          />
                        </Card>
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, position: "sticky", bottom: 0 }}>
                <CheckoutForm
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onAddressSelect={handleAddressSelect}
                  shippingFee={shippingFee}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: { xs: 2, md: 3 },
                  position: { xs: "static", md: "sticky" },
                  bottom: 0,
                }}
              >
                <Box
                  sx={{
                    borderColor: "grey.300",
                    minWidth: { xs: "100%", md: 400 },
                  }}
                >
                  <Typography fontWeight="600" mb={2}>
                    Thông tin thanh toán
                  </Typography>

                  {Object.entries(groupedProducts).map(
                    ([facilityId, group]) => {
                      const hasSelectedProducts = selectedProducts[facilityId]
                        ?.products
                        ? Object.values(
                            selectedProducts[facilityId].products
                          ).some((selected) => selected)
                        : false;

                      if (!hasSelectedProducts) return null;

                      const groupTotal = group.products.reduce((acc, item) => {
                        if (selectedProducts[facilityId]?.products?.[item.id]) {
                          return acc + item.price * item.qty;
                        }
                        return acc;
                      }, 0);

                      const baseShippingFee =
                        groupShippingFees[facilityId] || 0;

                      const totalShippingFee = baseShippingFee;

                      return (
                        <Box key={facilityId} sx={{ mb: 2 }}>
                          <Typography fontWeight={600} mb={1}>
                            {group.facilityName}
                          </Typography>
                          <FlexBox
                            alignItems="center"
                            justifyContent="space-between"
                            mb={0.5}
                          >
                            <Typography color="grey.600">Tạm tính:</Typography>
                            <Typography>{currency(groupTotal)}</Typography>
                          </FlexBox>
                          <FlexBox
                            alignItems="center"
                            justifyContent="space-between"
                            mb={0.5}
                          >
                            <Typography color="grey.600">
                              Phí vận chuyển cơ bản:
                            </Typography>
                            <Typography>{currency(baseShippingFee)}</Typography>
                          </FlexBox>

                          <FlexBox
                            alignItems="center"
                            justifyContent="space-between"
                            mb={1}
                          >
                            <Typography fontWeight={500}>Tổng cộng:</Typography>
                            <Typography color="primary.main">
                              {currency(groupTotal + totalShippingFee)}
                            </Typography>
                          </FlexBox>
                          <Divider sx={{ my: 1 }} />
                        </Box>
                      );
                    }
                  )}
                  <FlexBox
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography variant="h6">Tổng thanh toán:</Typography>
                    <Typography
                      variant="h6"
                      color="error.main"
                      fontWeight={600}
                    >
                      {currency(getTotalPrice())}
                    </Typography>
                  </FlexBox>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                    sx={{
                      py: 1.5,
                      fontSize: "16px",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "error.dark",
                      },
                    }}
                  >
                    Mua Hàng
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          height="calc(100vh - 74px)"
        >
          <LazyImage
            width={90}
            height={100}
            alt="banner"
            src="/assets/images/logos/shopping-bag.svg"
          />
          <Box
            component="p"
            mt={2}
            color="grey.600"
            textAlign="center"
            maxWidth="200px"
          >
            Giỏ hàng của bạn đang trống. Tiếp tục mua sắm
          </Box>
        </FlexBox>
      )}
    </CheckoutNavLayout>
  );
};

export default Cart;

const CartProductCard = ({
  item,
  facilityId,
  selectedProducts,
  handleSelectProduct,
}) => {
  const { id, product, qty, price } = item;
  const { dispatch } = useAppContext();

  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id: id,
        name: product.productName,
        price: product.price,
        imgUrl: product?.imgs[0],
        qty: amount,
        slug: id,
        product: product,
      },
    });
  };

  return (
    <Box
      sx={{
        borderBottom: "1px solid #f5f5f5",
        p: { xs: 1, md: 2 },
      }}
    >
      <FlexBox
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 0 },
          alignItems: { md: "center" },
        }}
      >
        <Checkbox
          checked={selectedProducts[facilityId]?.products?.[item.id] || false}
          onChange={(e) =>
            handleSelectProduct(facilityId, item.id, e.target.checked)
          }
          sx={{ mr: 2 }}
        />

        {/* Product Info */}
        <FlexBox sx={{ flex: 2 }} alignItems="center">
          <Box sx={{ width: 80, height: 80, mr: 2 }}>
            <LazyImage
              src={product?.imgs[0]}
              width={80}
              height={80}
              alt={product?.productName}
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Typography>{product?.productName}</Typography>
        </FlexBox>

        {/* Unit Price */}
        <Typography sx={{ flex: 1, textAlign: "center" }}>
          {currency(price)}
        </Typography>

        {/* Quantity */}
        <FlexBox sx={{ flex: 1 }} justifyContent="center" alignItems="center">
          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            disabled={qty === 1}
            onClick={handleCartAmountChange(qty - 1)}
          >
            <Remove fontSize="small" />
          </Button>
          <Typography sx={{ mx: 2 }}>{qty}</Typography>
          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            onClick={handleCartAmountChange(qty + 1)}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBox>

        {/* Total Price */}
        <Typography
          sx={{ flex: 1, textAlign: "center", color: "primary.main" }}
        >
          {currency(price * qty)}
        </Typography>

        {/* Actions */}
        <FlexBox sx={{ flex: 1 }} justifyContent="center">
          <Button color="error" onClick={handleCartAmountChange(0)}>
            Xóa
          </Button>
        </FlexBox>
      </FlexBox>
    </Box>
  );
};
