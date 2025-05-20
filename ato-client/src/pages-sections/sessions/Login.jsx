import { useCallback, useState, useEffect } from "react";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useFormik } from "formik";
import authService from "services/auth.service";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { useSnackbar } from "notistack";
const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": { ...googleStyle, "&:hover": googleStyle },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

const Login = () => {
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  // Add check for existing login
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      setLoginError("");
      const loginDTO = {
        Username: values.email,
        Password: values.password,
      };

      const response = await authService.login(loginDTO);
      if (response.bear) {
        enqueueSnackbar("Đăng nhập thành công", {
          variant: "success",
        });
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
      setLoginError(
        error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
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
          Đăng nhập
        </H1>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="text"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Tên đăng nhập"
          placeholder="Nhập tên đăng nhập của bạn"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Mật khẩu"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
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

        {/* Add error message display */}
        {loginError && (
          <Box color="error.main" textAlign="center" mb={2}>
            {loginError}
          </Box>
        )}

        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            height: 44,
          }}
        >
          Đăng nhập
        </Button>
      </form>

      <FlexRowCenter mt="1.25rem">
        <Box>Chưa có tài khoản?</Box>
        <Link href="/signup" passHref legacyBehavior>
          <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
            Đăng ký
          </H6>
        </Link>
      </FlexRowCenter>

      <FlexBox
        justifyContent="center"
        bgcolor="grey.200"
        borderRadius="4px"
        py={2.5}
        mt="1.25rem"
      >
        Quên mật khẩu?
        <Link href="/reset-password" passHref legacyBehavior>
          <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
            Cài đặt lại mật khẩu
          </H6>
        </Link>
      </FlexBox>
    </Wrapper>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  email: yup.string().required("Vui lòng nhập tên đăng nhập"),
});

export default Login;
