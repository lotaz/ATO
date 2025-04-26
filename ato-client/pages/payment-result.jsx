import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "contexts/AppContext";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { Done, Error } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import ShopLayout1 from "components/layouts/ShopLayout1"; // custom styled components

const PaymentResult = () => {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [paymentStatus, setPaymentStatus] = useState({
    success: false,
    message: "",
    loading: true,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (router.query.vnp_ResponseCode) {
      const isSuccess = router.query.vnp_ResponseCode === "00";
      const message = getPaymentMessage(router.query.vnp_ResponseCode);

      setPaymentStatus({
        success: isSuccess,
        message: message,
        loading: false,
      });

      if (isSuccess) {
        enqueueSnackbar("Đặt hàng thành công", { variant: "success" });
        // Clear cart and shipping info after successful payment
        dispatch({
          type: "RESET_CART",
        });
      }
    }
  }, [router.query, dispatch]);

  const getPaymentMessage = (responseCode) => {
    switch (responseCode) {
      case "00":
        return "Đặt hàng thành công";
      case "24":
        return "Giao dịch không thành công do: Khách hàng hủy giao dịch";
      case "09":
        return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng";
      case "10":
        return "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
      case "11":
        return "Giao dịch không thành công do: Đã hết hạn chờ thanh toán";
      case "12":
        return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa";
      default:
        return "Giao dịch không thành công";
    }
  };

  if (paymentStatus.loading) {
    return (
      <CheckoutNavLayout>
        <Container maxWidth="sm">
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography>Đang xử lý kết quả thanh toán...</Typography>
          </Box>
        </Container>
      </CheckoutNavLayout>
    );
  }

  return (
    <ShopLayout1>
      <Container maxWidth="sm">
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Box
            sx={{
              mb: 4,
              width: 64,
              height: 64,
              margin: "0 auto",
              display: "flex",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: paymentStatus.success
                ? "success.main"
                : "error.main",
            }}
          >
            {paymentStatus.success ? (
              <Done sx={{ color: "white", fontSize: 30 }} />
            ) : (
              <Error sx={{ color: "white", fontSize: 30 }} />
            )}
          </Box>

          <Typography variant="h4" component="h1" gutterBottom>
            {paymentStatus.success ? "Thành công!" : "Thất bại!"}
          </Typography>
          <Typography color="text.secondary" mb={4}>
            {paymentStatus.message}
          </Typography>
        </Box>
      </Container>
    </ShopLayout1>
  );
};

export default PaymentResult;
