import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  TextField,
  InputAdornment,
} from "@mui/material";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { H1, H2, H3 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import {
  Agriculture,
  EmojiPeople,
  Landscape,
  LocalActivity,
  Search,
} from "@mui/icons-material";
import Footer from "components/footer/Footer";

const IntroPage = () => {
  const features = [
    {
      icon: <Agriculture sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Du lịch nông nghiệp",
      description: "Khám phá các mô hình nông nghiệp độc đáo và sáng tạo",
    },
    {
      icon: <EmojiPeople sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Trải nghiệm văn hóa",
      description:
        "Tìm hiểu văn hóa địa phương thông qua các hoạt động tương tác",
    },
    {
      icon: <Landscape sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Khám phá thiên nhiên",
      description: "Khám phá vẻ đẹp thiên nhiên của vùng nông thôn Việt Nam",
    },
    {
      icon: <LocalActivity sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Hoạt động đặc sắc",
      description: "Tham gia các hoạt động độc đáo và thú vị",
    },
  ];

  return (
    <ShopLayout2>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/assets/small-banners/blur-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 6, md: 10 },
          mb: 6,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8} sx={{ mx: "auto", textAlign: "center" }}>
              <H2 color="white" mb={2}>
                Về chúng tôi
              </H2>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* About Section */}
      <Container sx={{ mb: 8, mt: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="relative" sx={{ width: "100%" }}>
              <img
                src="/assets/images/about-us.png"
                alt="About Us"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  borderRadius: "20px",
                }}
                className="h-full w-full object-cover rounded-lg shadow-lg"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <H3 color="primary.main" mb={3}>
              Về chúng tôi
            </H3>
            <Typography variant="body1" mb={3} lineHeight={1.8}>
              Chúng tôi là đơn vị tiên phong trong lĩnh vực du lịch nông nghiệp,
              mang đến những trải nghiệm độc đáo và ý nghĩa cho du khách.
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              Với sứ mệnh kết nối du khách với các điểm đến nông nghiệp đặc sắc,
              chúng tôi không ngừng nỗ lực phát triển các tour du lịch chất
              lượng, góp phần quảng bá hình ảnh nông nghiệp Việt Nam đến với du
              khách trong và ngoài nước.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container>
          <H3 textAlign="center" mb={6}>
            Điểm nổi bật của chúng tôi
          </H3>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <FlexBox
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      bgcolor: "primary.light",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </FlexBox>
                  <H3 fontSize={20} mb={2}>
                    {feature.title}
                  </H3>
                  <Typography>{feature.description}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer
        id="footer"
        sx={{
          borderRadius: "8px",
          backgroundColor: "primary.800",
        }}
      />
    </ShopLayout2>
  );
};

export default IntroPage;
