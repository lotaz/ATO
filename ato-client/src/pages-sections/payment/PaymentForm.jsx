import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Box, Button, Divider, Grid, Radio, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";

const PaymentForm = ({ onPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;

  const handleSubmit = (e) => {
    e.preventDefault();
    onPayment(paymentMethod);
  };
  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Card1
        sx={{
          mb: 4,
        }}
      >
        <FormControlLabel
          name="paypal"
          sx={{
            mb: 3,
          }}
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Thanh toán qua VNPay</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "paypal"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

        <FormControlLabel
          name="cod"
          onChange={handlePaymentMethodChange}
          label={
            <Paragraph fontWeight={600}>Thanh toán khi nhận hàng</Paragraph>
          }
          control={
            <Radio
              checked={paymentMethod === "cod"}
              color="primary"
              size="small"
            />
          }
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout" passHref>
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Trở về giỏ hàng
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="button"
            fullWidth
          >
            Xác nhận đơn hàng
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",
  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: "",
};
const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("required"),
  name: yup.string().required("required"),
  exp_date: yup.string().required("required"),
  cvc: yup.string().required("required"), // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});
export default PaymentForm;
