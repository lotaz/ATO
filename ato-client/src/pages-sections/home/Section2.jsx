import { Box, Button, Card, Container, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { H4, Paragraph } from "components/Typography"; // styled components

const ContentBox = styled(Card)(() => ({
  height: 220,
  display: "flex",
  alignItems: "center",
  "& .content": {
    width: "50%",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 400,
  fontSize: "12px",
  marginTop: "16px",
  padding: "4px 12px",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary[400],
  },
}));

const Section2 = () => {
  return (
    <Box my={7.5}>
      <Container
        sx={{
          pb: "1rem",
        }}
      >
        <ContentBox
          sx={{
            px: "20px",
          }}
        >
          <Box className="content">
            <H4 fontWeight="700">Giới thiệu</H4>
            <Paragraph
              sx={{
                fontSize: 14,
              }}
            >
              Phát triển bền vững, bao trùm và đa giá trị. Nền tảng du lịch nông
              thôn kết hợp giới thiệu sản phẩm OCOP địa phương
            </Paragraph>

            <StyledButton>Xem thêm</StyledButton>
          </Box>

          <Box className="content">
            <Image
              width="100%"
              src="/assets/images/Health Shop/Product (4).png"
              alt="shop"
            />
          </Box>
        </ContentBox>
      </Container>
    </Box>
  );
};

export default Section2;
