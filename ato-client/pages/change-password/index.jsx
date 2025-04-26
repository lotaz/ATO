import { KeyOutlined, Save } from "@mui/icons-material";
import { Box, Button, Grid, TextField } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { H4, Small } from "components/Typography";
import { Formik } from "formik";
import { put } from "helpers/axios-helper";
import { useSnackbar } from "notistack";
import * as yup from "yup";

const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar();

  const INITIAL_VALUES = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required("Mật khẩu hiện tại là bắt buộc"),
    newPassword: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu mới là bắt buộc"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    const response = await put("/profile/change-password", {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });

    if (response.data.status) {
      enqueueSnackbar(response.data.message, { variant: "success" });
      resetForm();
    } else {
      enqueueSnackbar(response.data.message, { variant: "error" });
    }
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={KeyOutlined}
        title="Đổi mật khẩu"
        navigation={<CustomerDashboardNavigation />}
      />

      <Card1 sx={{ p: 4 }}>
        <FlexBox alignItems="center" mb={4}>
          <Box>
            <H4 mb={0.5}>Đổi mật khẩu</H4>
            <Small color="grey.600">
              Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
              khác
            </Small>
          </Box>
        </FlexBox>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currentPassword}
                    error={
                      !!touched.currentPassword && !!errors.currentPassword
                    }
                    helperText={
                      touched.currentPassword && errors.currentPassword
                    }
                    sx={{ bgcolor: "background.paper" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    name="newPassword"
                    label="Mật khẩu mới"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword}
                    error={!!touched.newPassword && !!errors.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                    sx={{ bgcolor: "background.paper" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    error={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ bgcolor: "background.paper" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    startIcon={<Save />}
                    sx={{
                      mt: 3,
                      px: 6,
                      height: 44,
                      borderRadius: "8px",
                      boxShadow: 2,
                    }}
                  >
                    Lưu thay đổi
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  );
};

export default ChangePassword;
