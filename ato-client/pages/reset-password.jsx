import Link from "next/link";
import SEO from "components/SEO";
import { Box, Button, Card, TextField } from "@mui/material";
import { H1, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import BazaarTextField from "components/BazaarTextField";
import BazaarImage from "components/BazaarImage";

const ResetPassword = () => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Reset Password" />

      <Card
        sx={{
          padding: 4,
          maxWidth: 600,
          marginTop: 4,
          boxShadow: 1,
        }}
      >
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
        <H1 fontSize={20} fontWeight={700} mt={4} textAlign="center">
          Cài đặt lại mật khẩu
        </H1>
        <p style={{ textAlign: "center" }}>
          Mã xác nhận sẽ được gửi về tài khoản zalo của bạn
        </p>
        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form
            style={{
              width: "100%",
            }}
          >
            <BazaarTextField
              mb={1.5}
              fullWidth
              name="name"
              size="small"
              label="Tên đăng nhập"
              variant="outlined"
              placeholder="Nhập tên đăng nhập của bạn"
            />

            <Box
              sx={{
                mt: 2,
              }}
            >
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
              >
                Gửi
              </Button>
            </Box>
          </form>

          <FlexRowCenter mt="1.25rem" justifyContent="center" width="100%">
            <Box>Chưa có tài khoản?</Box>
            <Link href="/signup" passHref legacyBehavior>
              <a>
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Đăng ký
                </H6>
              </a>
            </Link>
          </FlexRowCenter>
        </FlexBox>
      </Card>
    </FlexRowCenter>
  );
};

export default ResetPassword;
