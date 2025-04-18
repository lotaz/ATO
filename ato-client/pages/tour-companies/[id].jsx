import { Email, Language, LocationOn } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { useState } from "react";
import api from "utils/__api__/company";

const CompanyDetails = ({ company }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ShopLayout2>
      <Box bgcolor="grey.100" py={4}>
        <Container>
          {/* Company Header */}
          <Card sx={{ p: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    position: "relative",
                    bgcolor: "grey.50",
                    borderRadius: 1,
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={company.logoURL}
                    alt={company.companynName}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <H2 mb={2}>{company.companynName}</H2>
                <Typography color="text.secondary" mb={3}>
                  {company.companyDescription}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOn color="primary" />
                    <Typography>{company.addressCompany}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email color="primary" />
                    <Typography
                      component="a"
                      href={`mailto:${company.emailCompany}`}
                    >
                      {company.emailCompany}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Language color="primary" />
                    <Typography
                      component="a"
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* Tabs Section */}
          <Card>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Tour du lịch" />
              <Tab label="Về chúng tôi" />
              <Tab label="Liên hệ" />
            </Tabs>

            <Box p={3}>
              {tabValue === 0 && (
                <Box>
                  {/* Tour packages will be added here */}
                  <Typography>Tour du lịch coming soon...</Typography>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Về công ty {company.companynName}
                  </Typography>
                  <Typography>{company.companyDescription}</Typography>
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Thông tin liên hệ
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Typography>Address: {company.addressCompany}</Typography>
                    <Typography>Email: {company.emailCompany}</Typography>
                    <Typography>Website: {company.website}</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Card>
        </Container>
      </Box>
    </ShopLayout2>
  );
};

export const getStaticPaths = async () => {
  const companies = await api.getCompanyList();
  const paths = companies.map((company) => ({
    params: { id: company.tourCompanyId.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const company = await api.getCompanyById(params.id);
    return {
      props: {
        company,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default CompanyDetails;
