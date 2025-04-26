import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, H6 } from "components/Typography";
import { useFormik } from "formik";
import { post } from "helpers/axios-helper";
import Link from "next/link";
import { useCallback, useState } from "react";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import { Wrapper } from "./Login";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    const signupData = {
      userName: values.userName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      fullname: values.fullname,
      gender: values.gender,
      password: values.password,
      dob: values.dob,
      role: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Default role for tourist
    };

    const response = await post("auth/sign-up", signupData);
    const data = response.data;
    if (data.status === true) {
      enqueueSnackbar(data.message, { variant: "success" });
      router.push("/login");
    } else {
      enqueueSnackbar(data.message, {
        variant: "error",
      });
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <Link href={"/"}>
          <BazaarImage
            width={"auto"}
            height={100}
            src="/assets/congbinh/logos/logo.png"
            sx={{
              m: "auto",
            }}
          />
        </Link>
        <H1 textAlign="center" mt={2} mb={4} fontSize={20}>
          Đăng Ký Tài Khoản
        </H1>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="userName"
          size="small"
          label="Tên đăng nhập"
          variant="outlined"
          onBlur={handleBlur}
          value={values.userName}
          onChange={handleChange}
          placeholder="username"
          error={!!touched.userName && !!errors.userName}
          helperText={touched.userName && errors.userName}
        />
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="fullname"
          size="small"
          label="Họ và tên"
          variant="outlined"
          onBlur={handleBlur}
          value={values.fullname}
          onChange={handleChange}
          placeholder="Nguyễn Văn A"
          error={!!touched.fullname && !!errors.fullname}
          helperText={touched.fullname && errors.fullname}
        />
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email"
          placeholder="example@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="phoneNumber"
          size="small"
          variant="outlined"
          onBlur={handleBlur}
          value={values.phoneNumber}
          onChange={handleChange}
          label="Số điện thoại"
          placeholder="0123456789"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Mật khẩu"
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />
        <BazaarTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label="Xác nhận mật khẩu"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />
        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={values.agreement || false}
            />
          }
          label={
            <FlexBox
              flexWrap="wrap"
              alignItems="center"
              justifyContent="flex-start"
            >
              Bằng cách đăng ký tài khoản, bạn đồng ý với
              <H6 borderBottom="1px solid" borderColor="grey.900">
                Điều khoản & chính sách bảo mật
              </H6>
            </FlexBox>
          }
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            height: 44,
          }}
        >
          Đăng Ký
        </Button>
      </form>

      <FlexRowCenter mt="1.25rem">
        <Box>Đã có tài khoản?</Box>
        <Link href="/login" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Đăng nhập
            </H6>
          </a>
        </Link>
      </FlexRowCenter>
    </Wrapper>
  );
};

const initialValues = {
  userName: "",
  email: "",
  phoneNumber: "",
  fullname: "",
  password: "",
  re_password: "",
  gender: true,
  dob: new Date(),
  agreement: false,
};

const formSchema = yup.object().shape({
  userName: yup.string().required("Tên đăng nhập là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phoneNumber: yup.string().required("Số điện thoại là bắt buộc"),
  fullname: yup.string().required("Họ tên là bắt buộc"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "Bạn phải đồng ý với điều khoản sử dụng!",
      (value) => value === true
    )
    .required("Bạn phải đồng ý với điều khoản sử dụng!"),
});

export default Signup;
