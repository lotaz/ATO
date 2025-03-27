import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import { BusinessCenter, Security, Support, Groups } from "@mui/icons-material";
import SEO from "components/SEO";
import { H2 } from "components/Typography";
import { getCompanyList } from "utils/__api__/company";
import CompanyCard from "pages-sections/tour-companies/CompanyCard";
import ShopLayout2 from "components/layouts/ShopLayout2";
import Footer from "components/footer/Footer";
// Add import for no data icon
import { SentimentDissatisfied } from "@mui/icons-material";

const ServiceBox = ({ icon: Icon, title, description }) => (
  <Box
    sx={{
      p: 3,
      height: "100%",
      display: "flex",
      alignItems: "center",
      borderRadius: 2,
      bgcolor: "background.paper",
      border: "1px solid",
      borderColor: "grey.200",
      transition: "transform 0.3s",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 2,
      },
    }}
  >
    <Icon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Box>
);

const CompanyList = ({ companies }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companies.filter((company) =>
    company.companynName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ShopLayout2>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1976d2, #0d47a1)",
          py: { xs: 6, md: 10 },
          mb: 6,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8} sx={{ mx: "auto", textAlign: "center" }}>
              <H2 color="white" mb={2}>
                Công ty Du lịch
              </H2>
              <Typography color="white" sx={{ mb: 4, opacity: 0.9 }}>
                Khám phá và trải nghiệm cùng những công ty du lịch hàng đầu tại
                Việt Nam
              </Typography>

              {/* Search Bar in Hero */}
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Tìm kiếm công ty..."
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "white",
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceBox
              icon={BusinessCenter}
              title="Dịch vụ chuyên nghiệp"
              description="Đội ngũ nhân viên giàu kinh nghiệm"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceBox
              icon={Groups}
              title="Tour đa dạng"
              description="Nhiều lựa chọn phù hợp mọi nhu cầu"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceBox
              icon={Security}
              title="An toàn tối đa"
              description="Đảm bảo an toàn trong suốt hành trình"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceBox
              icon={Support}
              title="Hỗ trợ 24/7"
              description="Luôn sẵn sàng phục vụ"
            />
          </Grid>
        </Grid>
      </Container>

      {/* Companies Grid */}
      <Box bgcolor="grey.100" py={6}>
        <Container maxWidth="lg">
          <SEO title="Công ty Du lịch" />

          {/* Added Title Section */}
          <Box textAlign="center" mb={4}>
            <H2 color="primary.main">Danh sách công ty du lịch</H2>
            <Typography variant="body1" color="text.secondary">
              {filteredCompanies.length} công ty du lịch đang hoạt động
            </Typography>
          </Box>

          {filteredCompanies.length > 0 ? (
            <Grid container spacing={3}>
              {filteredCompanies.map((company) => (
                <Grid item xs={12} sm={6} md={4} key={company.tourCompanyId}>
                  <CompanyCard company={company} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 2,
                backgroundColor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <SentimentDissatisfied
                sx={{
                  fontSize: 60,
                  color: "grey.400",
                  mb: 2,
                }}
              />
              <Typography variant="h6" color="grey.600" gutterBottom>
                Không tìm thấy công ty
              </Typography>
              <Typography color="grey.500">
                Không tìm thấy công ty phù hợp với từ khóa "{searchQuery}"
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      <Footer
        id="footer"
        sx={{
          borderRadius: "8px",
          backgroundColor: "primary.800",
          mt: 8,
        }}
      />
    </ShopLayout2>
  );
};

export const getStaticProps = async () => {
  const companies = await getCompanyList();
  return {
    props: {
      companies,
    },
    revalidate: 60,
  };
};

export default CompanyList;
