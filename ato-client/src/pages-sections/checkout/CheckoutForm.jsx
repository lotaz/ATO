import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";

const CheckoutForm = () => {
  const router = useRouter();
  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  useEffect(() => {
    const storedValues = sessionStorage.getItem("shippingInfo");
    if (storedValues) {
      setInitialFormValues(JSON.parse(storedValues));
    }
  }, []);

  const handleFormSubmit = async (values) => {
    sessionStorage.setItem("shippingInfo", JSON.stringify(values));
    router.push("/payment");
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
          <Box
            sx={{
              mb: 4,
            }}
          >
            <Typography fontWeight="600" mb={2}>
              Thông tin thanh toán
            </Typography>

            <Stack spacing={2}>
              <TextField
                fullWidth
                sx={{
                  mb: 2,
                }}
                label="Họ và tên"
                onBlur={handleBlur}
                name="shipping_name"
                onChange={handleChange}
                value={values.shipping_name}
                error={!!touched.shipping_name && !!errors.shipping_name}
                helperText={touched.shipping_name && errors.shipping_name}
              />
              <TextField
                fullWidth
                sx={{
                  mb: 2,
                }}
                onBlur={handleBlur}
                label="Số điện thoại"
                onChange={handleChange}
                name="shipping_contact"
                value={values.shipping_contact}
                error={!!touched.shipping_contact && !!errors.shipping_contact}
                helperText={touched.shipping_contact && errors.shipping_contact}
              />

              <TextField
                fullWidth
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                name="shipping_address1"
                value={values.shipping_address1}
                error={
                  !!touched.shipping_address1 && !!errors.shipping_address1
                }
                helperText={
                  touched.shipping_address1 && errors.shipping_address1
                }
              />
              <TextField
                fullWidth
                type="email"
                sx={{
                  mb: 2,
                }}
                onBlur={handleBlur}
                name="shipping_email"
                label="Email"
                onChange={handleChange}
                value={values.shipping_email}
                error={!!touched.shipping_email && !!errors.shipping_email}
                helperText={touched.shipping_email && errors.shipping_email}
              />
            </Stack>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
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
  shipping_address1: "",
}; // uncomment these fields below for from validation

const checkoutSchema = yup.object().shape({
  shipping_name: yup.string().required("Vui lòng nhập họ tên"),
  shipping_email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  shipping_contact: yup.string().required("Vui lòng nhập số điện thoại"),
  shipping_address1: yup.string().required("Vui lòng nhập địa chỉ"),
});
export default CheckoutForm;
