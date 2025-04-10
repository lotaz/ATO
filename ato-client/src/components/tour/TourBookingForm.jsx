import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { OrderType, PaymentStatus, PaymentType } from "constants/order-enums";
import currency from "currency.js";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import tourBookingService from "services/tour-booking.service";
import { Tooltip, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const TourBookingForm = ({
  tourId,
  price,
  selectedProducts = [],
  setSelectedProducts,
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(PaymentType.Transfer);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const orderDetails = selectedProducts.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      unitPrice: product.price,
    }));
    try {
      const bookingData = {
        tourId,
        numberOfPeople,
        orders: [
          {
            orderType: OrderType.Online,
            paymentType: paymentMethod,
            paymentStatus: PaymentStatus.UnPaid,
            orderDetails: orderDetails,
          },
        ],
      };

      const vnPayLink = await tourBookingService.bookTour(bookingData);

      if (vnPayLink) {
        window.location.href = vnPayLink;
      }
    } catch (error) {
      enqueueSnackbar("Đặt tour không thành công. Vui lòng thử lại.", {
        variant: "error",
      });
      console.error("Booking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total amount
  const calculateTotal = () => {
    const tourCost = price * numberOfPeople;
    const productsCost = selectedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    return <>{(tourCost + productsCost).toLocaleString()}</>;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Đặt tour
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Số người"
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(Number(e.target.value))}
            margin="normal"
            inputProps={{ min: 1 }}
          />
          <Box
            sx={{
              mt: 3,
              mb: 2,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Chi tiết thanh toán
            </Typography>

            <Grid container spacing={2}>
              {/* Left Column - Items */}
              <Grid item xs={8}>
                <Typography fontWeight="bold">Sản phẩm/Dịch vụ</Typography>

                {/* Tour Cost */}
                <Box mt={1}>
                  <Tooltip title={`Tour ${tourId}`}>
                    <Typography noWrap>
                      Tour ({numberOfPeople} người)
                    </Typography>
                  </Tooltip>
                </Box>

                {/* Products List */}
                {selectedProducts?.map((product, index) => (
                  <Box key={product.productId} mt={1}>
                    <Box display="flex" alignItems="center">
                      <Tooltip title={product.productName}>
                        <Typography noWrap sx={{ flex: 1 }}>
                          {product.productName.length > 30
                            ? `${product.productName.substring(0, 30)}...`
                            : product.productName}
                        </Typography>
                      </Tooltip>
                      <Box display="flex" alignItems="center" ml={2}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            const newProducts = [...selectedProducts];
                            if (newProducts[index].quantity > 1) {
                              newProducts[index].quantity -= 1;
                              setSelectedProducts(newProducts);
                            } else {
                              setSelectedProducts(
                                selectedProducts.filter(
                                  (p) => p.productId !== product.productId
                                )
                              );
                            }
                          }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography mx={1}>{product.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => {
                            const newProducts = [...selectedProducts];
                            newProducts[index].quantity += 1;
                            setSelectedProducts(newProducts);
                          }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>

              {/* Right Column - Prices */}
              <Grid item xs={4}>
                <Typography fontWeight="bold" textAlign="right">
                  Đơn giá
                </Typography>

                {/* Tour Price */}
                <Box my={1}>
                  <Typography textAlign="right">
                    {(price * numberOfPeople).toLocaleString()} VNĐ
                  </Typography>
                </Box>

                {/* Product Prices */}
                {selectedProducts?.map((product) => (
                  <Box key={`price-${product.productId}`} my={2}>
                    <Typography textAlign="right">
                      {(product.price * product.quantity).toLocaleString()} VNĐ
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>

            {/* Total Amount */}
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              fontWeight="bold"
            >
              <Typography>Tổng cộng</Typography>
              <Typography>{calculateTotal()} VNĐ</Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 3 }}
          >
            {isLoading ? "Đang xử lý..." : "Thanh toán qua VNPay"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TourBookingForm;
