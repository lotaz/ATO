import Link from "next/link";
import { Box, Container, Grid, IconButton, Stack, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import Google from "components/icons/Google";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram"; // styled component
import BazaarImage from "components/BazaarImage";
import { Email, LocationCity, LocationOn, Phone } from "@mui/icons-material";

const StyledLink = styled("a")(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));

const Footer = () => {
  return (
    <footer>
      <Box bgcolor="#222935">
        <Container
          sx={{
            p: "1rem",
            color: "white",
          }}
        >
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href={"/"}>
                  <BazaarImage
                    width={100}
                    height={100}
                    sx={{
                      borderRadius: "100%",
                    }}
                    src="/assets/congbinh/logos/logo.png"
                  />
                </Link>

                <Paragraph mb={2.5} mt={2.5} color="grey.500">
                  Phát triển bền vững, bao trùm và đa giá trị. Nền tảng du lịch
                  nông thôn kết hợp giới thiệu sản phẩm OCOP địa phương
                </Paragraph>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Về chúng tôi
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Hỗ trợ khách hàng
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Liên hệ
                </Box>
                <Stack direction={"row"} py={0.6} gap={1} color="grey.500">
                  <LocationOn /> Cau Giay, Hanoi, Vietnam
                </Stack>
                <Stack direction={"row"} py={0.6} gap={1} color="grey.500">
                  <Email /> Email: ato_dulich@gmail.com
                </Stack>
                <Stack direction={"row"} py={0.6} gap={1} color="grey.500">
                  <Phone /> Phone: 0977.661.883
                </Stack>

                <FlexBox className="flex" mx={-0.625} mt={2}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <IconButton
                        sx={{
                          margin: 0.5,
                          fontSize: 16,
                          padding: "10px",
                          backgroundColor: "rgba(0,0,0,0.2)",
                        }}
                      >
                        <item.icon fontSize="inherit" />
                      </IconButton>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = ["Tuyển dụng", "Tin tức", "Sự kiện", "Khuyến mãi"];
const customerCareLinks = [
  "Chính sách và Quy định chung",
  "Bảo mật thông tin",
  "Quy định hình thức thanh toán",
  "Hỏi đáp",
];
const iconList = [
  {
    icon: Facebook,
    url: "/",
  },
  {
    icon: Twitter,
    url: "/",
  },
  {
    icon: Youtube,
    url: "/",
  },
  {
    icon: Google,
    url: "/",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/uilibofficial/",
  },
];
export default Footer;
