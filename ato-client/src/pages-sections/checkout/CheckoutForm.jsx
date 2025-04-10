import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { OrderType, PaymentStatus, PaymentType } from "constants/order-enums";
import { useAppContext } from "contexts/AppContext";
import { Formik } from "formik";
import { get, post } from "helpers/axios-helper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import paymentService from "services/payment.service";
import * as yup from "yup";
import { currency } from "lib";

const CheckoutForm = () => {
  const router = useRouter();
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const [addresses, setAddresses] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [addressId, setAddressId] = useState(null);
  const { state } = useAppContext();

  useEffect(() => {
    const storedValues = sessionStorage.getItem("shippingInfo");
    if (storedValues) {
      setInitialFormValues(JSON.parse(storedValues));
    }
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const response = await get("/tourist/shipp-address/list-ship-addresses");
    setAddresses(response.data || []);
  };

  const calculateShippingFee = async (address) => {
    if (!address) return;

    const response = await post("/tourist/order/calculate-shipping-fee", {
      toWardCode: address.toWardCode,
      toDistrictId: address.toDistrictId,
      weight: 15,
    });

    console.log("response", response);
    setShippingFee(response.data?.data?.total || 0);
  };

  const handleAddressSelect = (address, setFieldValue) => {
    setFieldValue("toName", address.toName);
    setFieldValue("toPhone", address.toPhone);
    setFieldValue("toWardCode", address.toWardCode);
    setFieldValue("toDistrictId", address.toDistrictId);
    setFieldValue("shipAddressId", address.shipAddressId);
    setAddressId(address.shipAddressId);
    calculateShippingFee(address);
  };

  const handleFormSubmit = async (values) => {
    sessionStorage.setItem("shippingInfo", JSON.stringify(values));
    router.push("/payment");
  };

  // Add this function to calculate cart total
  const calculateCartTotal = () => {
    return state.cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  // Update the handlePayment function
  const handlePayment = async (paymentType) => {
    try {
      const orderDetails = state.cart.map((item) => ({
        ProductId: item.id,
        Quantity: item.qty,
        UnitPrice: item.price,
      }));

      const cartTotal = calculateCartTotal();
      const totalAmount = cartTotal + shippingFee;

      const orderRequest = {
        OrderType: OrderType.Online,
        PaymentType: PaymentType.Transfer,
        PaymentStatus: PaymentStatus.UnPaid,
        OrderDetails: orderDetails,
        ShipAddressId: addressId,
        ShippingFee: shippingFee,
        TotalAmount: totalAmount,
      };

      const response = await paymentService.createOrder(orderRequest);

      // // Clear cart and shipping info after successful order
      // sessionStorage.removeItem("shippingInfo");

      if (response?.status === true) {
        sessionStorage.removeItem("cart");
        router.push("/payment-result?vnp_ResponseCode=00");
      }

      if (response) {
        router.push(response);
      }
      // Redirect to order confirmation
    } catch (error) {
      console.error("Order creation failed:", error);
      // Handle error appropriately
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box mb={4}>
            <Typography fontWeight="600" mb={2}>
              Thông tin thanh toán
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Chọn địa chỉ giao hàng
                </Typography>
                <RadioGroup
                  name="shipAddressId"
                  value={values.shipAddressId || ""}
                  onChange={(e) => {
                    const selectedAddress = addresses.find(
                      (a) => a.shipAddressId === e.target.value
                    );
                    handleAddressSelect(selectedAddress, setFieldValue);
                  }}
                >
                  {addresses.map((address) => (
                    <Card key={address.shipAddressId} sx={{ mb: 2, p: 2 }}>
                      <FormControlLabel
                        value={address.shipAddressId}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography fontWeight="600">
                              {address.toName} - {address.toPhone}
                              {address.defaultAddress && " (Mặc định)"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {address.toWardCode}, {address.toDistrictId}
                            </Typography>
                          </Box>
                        }
                      />
                    </Card>
                  ))}
                </RadioGroup>
              </Box>

              {shippingFee > 0 && (
                <>
                  <Typography variant="body1">
                    Phí vận chuyển: {currency(shippingFee)}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Tổng cộng:
                    {currency(calculateCartTotal() + shippingFee)}
                  </Typography>
                </>
              )}
            </Stack>
          </Box>
          <Button
            onClick={handlePayment}
            type="button"
            variant="contained"
            color="primary"
            fullWidth
          >
            Thanh toán ngay
          </Button>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipAddressId: "",
  toName: "",
  toPhone: "",
  toWardCode: "",
  toDistrictId: "",
};

const checkoutSchema = yup.object().shape({
  shipping_name: yup.string().required("Vui lòng nhập họ tên"),
  shipping_email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  shipping_contact: yup.string().required("Vui lòng nhập số điện thoại"),
  shipAddressId: yup.string().required("Vui lòng chọn địa chỉ giao hàng"),
});
export default CheckoutForm;
