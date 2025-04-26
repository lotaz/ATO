import { ArrowBack, Person, Save } from "@mui/icons-material";
import { Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { H4, Small } from "components/Typography";
import { Formik } from "formik";
import { get, put } from "helpers/axios-helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { FileUploader } from "./FileUploader";
// ===========================================================
// Add this import at the top
import { useSnackbar } from "notistack";

const ProfileEditor = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get("/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        enqueueSnackbar("Không thể tải thông tin người dùng", {
          variant: "error",
        });
        router.push("/profile");
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  if (!user) return <p>Đang tải...</p>;

  const INITIAL_VALUES = {
    fullName: user.fullName || "",
    phoneNumber: user.phoneNumber || "",
    email: user.email || "",
    dob: user.dob || new Date(),
    avatarURL: user.avatarURL || "",
  };

  // Update validation schema
  const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("Họ tên là bắt buộc"),
    phoneNumber: yup.string().required("Số điện thoại là bắt buộc"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    dob: yup.date().required("Ngày sinh không hợp lệ"),
  });

  // Update form submit handler
  const handleFormSubmit = async (values) => {
    try {
      await put("/profile", {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        dob: values.dob,
        avatarURL: user.avatarURL,
      });
      enqueueSnackbar("Cập nhật thông tin thành công!", {
        variant: "success",
      });
      router.push("/profile");
    } catch (error) {
      console.error("Update failed:", error);
      enqueueSnackbar("Cập nhật thất bại. Vui lòng thử lại!", {
        variant: "error",
      });
    }
  };

  // Update form fields
  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Person}
        title="Chỉnh sửa thông tin"
        button={
          <Link href="/profile" passHref>
            <Button
              startIcon={<ArrowBack />}
              color="primary"
              sx={{
                px: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.light",
                },
              }}
            >
              Trở về
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Card1 sx={{ p: 4 }}>
        <FlexBox alignItems="center" mb={4}>
          <Box ml={3}>
            <H4 mb={0.5}>Cập nhật thông tin cá nhân</H4>
            <Small color="grey.600">
              Cập nhật thông tin của bạn để nhận được trải nghiệm tốt nhất
            </Small>
          </Box>
        </FlexBox>

        <Box mb={4} display="flex" justifyContent="center">
          <FileUploader
            value={user.avatarURL}
            onChange={(imageUrl) => {
              // Update the user state with the new image URL
              setUser({ ...user, avatarURL: imageUrl });
            }}
          />
        </Box>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={checkoutSchema}
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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="fullName"
                    label="Họ và tên"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullName}
                    error={!!touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                    sx={{ bgcolor: "background.paper" }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    label="Số điện thoại"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ bgcolor: "background.paper" }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ bgcolor: "background.paper" }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày sinh"
                      maxDate={new Date()}
                      value={values.dob}
                      inputFormat="dd/MM/yyyy"
                      renderInput={(props) => (
                        <TextField
                          fullWidth
                          {...props}
                          error={!!touched.dob && !!errors.dob}
                          helperText={touched.dob && errors.dob}
                          sx={{ bgcolor: "background.paper" }}
                        />
                      )}
                      onChange={(newValue) => setFieldValue("dob", newValue)}
                    />
                  </LocalizationProvider>
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

// Remove getStaticPaths and getStaticProps as we're using client-side data fetching
export default ProfileEditor;
