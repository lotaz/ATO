import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import paymentService from "services/payment.service";
import { useAppContext } from "contexts/AppContext";
import { OrderType, PaymentStatus, PaymentType } from "constants/order-enums";
import { useSnackbar } from "notistack";

const Payment = () => {
  const router = useRouter();
  const { state } = useAppContext();
  const [shippingInfo, setShippingInfo] = useState(null);

  const handlePayment = async (paymentType) => {
    try {
      const orderDetails = state.cart.map((item) => ({
        ProductId: item.id,
        Quantity: item.qty,
        UnitPrice: item.price,
      }));

      const orderRequest = {
        OrderType: OrderType.Online,
        PaymentType:
          paymentType === "paypal"
            ? PaymentType.Transfer
            : PaymentType.CashOnDelivery,
        PaymentStatus: PaymentStatus.UnPaid,
        OrderDetails: orderDetails,
      };

      const response = await paymentService.createOrder(orderRequest);

      // // Clear cart and shipping info after successful order
      // sessionStorage.removeItem("shippingInfo");
      // sessionStorage.removeItem("cart");
      console.log("h", response);
      if (response?.status === true) {
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

  if (!shippingInfo) return null;

  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <PaymentForm onPayment={handlePayment} />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <PaymentSummary />
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export default Payment;
