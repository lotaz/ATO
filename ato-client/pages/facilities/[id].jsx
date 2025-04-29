import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { H2 } from "components/Typography";
import Footer from "components/footer/Footer";
import SEO from "components/SEO";
import { useState, useEffect } from "react";
import { get } from "helpers/axios-helper";
import { LocationOn, Phone, Email, Language } from "@mui/icons-material";
import { useRouter } from "next/router";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Tab from "@mui/material/Tab";
const FacilityDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [facility, setFacility] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    const fetchFacility = async () => {
      if (!id) return;
      try {
        const response = await get(`/tourist-facility/${id}`);
        setFacility(response.data);
      } catch (error) {
        console.error("Failed to fetch facility:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  if (isLoading) {
    return (
      <ShopLayout2>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <CircularProgress />
        </Container>
      </ShopLayout2>
    );
  }

  if (!facility) {
    return (
      <ShopLayout2>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4">Không tìm thấy cơ sở</Typography>
        </Container>
      </ShopLayout2>
    );
  }

  return (
    <ShopLayout2>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1976d2, #0d47a1)",
          py: { xs: 6, md: 10 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <H2 color="white" textAlign="center" mb={2}>
            {facility.touristFacilityName}
          </H2>
          <Typography
            color="white"
            textAlign="center"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Thông tin chi tiết về cơ sở du lịch
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <SEO title={`${facility.touristFacilityName} - Chi tiết cơ sở`} />

        <Grid container spacing={4}>
          {/* Facility Image */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={facility.logoURL || "/placeholder.jpg"}
                alt={facility.touristFacilityName}
                sx={{ borderRadius: 2 }}
              />
            </Card>
          </Grid>

          {/* Facility Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom>
                {facility.touristFacilityName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {facility.description}
              </Typography>
            </Box>

            {/* Contact Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Thông tin liên hệ
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" />
                  <Typography>
                    {[
                      facility.ward_name,
                      facility.district_name,
                      facility.province_name,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </Typography>
                </Box>
                {facility.phone && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Phone fontSize="small" />
                    <Typography>{facility.phone}</Typography>
                  </Box>
                )}
                {facility.emailTouristFacility && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email fontSize="small" />
                    <Typography>{facility.emailTouristFacility}</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Certifications */}
            {facility.Certifications?.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Chứng nhận
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {facility.certifications.map((cert) => (
                    <Chip
                      key={cert.certificationId}
                      label={cert.certificationName}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: "primary.main",
                        color: "primary.main",
                        "& .MuiChip-label": {
                          fontWeight: 500,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
              {facility.website && (
                <Button
                  variant="contained"
                  startIcon={<Language />}
                  href={facility.website}
                  target="_blank"
                >
                  Truy cập website
                </Button>
              )}
              <Button variant="outlined" onClick={() => router.back()}>
                Quay lại
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", typography: "body1", mt: 4 }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="Facility tabs">
                <Tab label="Chứng nhận" value="1" />
                <Tab label="Sản phẩm" value="2" />
              </TabList>
            </Box>

            {/* Certifications Tab */}
            <TabPanel value="1">
              {facility.Certifications?.length > 0 ? (
                <Grid container spacing={2}>
                  {facility.Certifications.map((cert) => (
                    <Grid item xs={12} md={6} key={cert.CertificationId}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {cert.CertificationName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ngày cấp:{" "}
                            {new Date(cert.IssueDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ngày hết hạn:{" "}
                            {new Date(cert.ExpiryDate).toLocaleDateString()}
                          </Typography>
                          {cert.CertificationDetails && (
                            <Typography variant="body2" sx={{ mt: 2 }}>
                              {cert.CertificationDetails}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Không có chứng nhận nào
                </Typography>
              )}
            </TabPanel>

            {/* Products Tab */}
            <TabPanel value="2">
              {facility.Products?.length > 0 ? (
                <Grid container spacing={2}>
                  {facility.Products.map((product) => (
                    <Grid item xs={12} md={4} key={product.ProductId}>
                      <Card>
                        {product.Imgs?.length > 0 && (
                          <CardMedia
                            component="img"
                            height="200"
                            image={product.Imgs[0]}
                            alt={product.ProductName}
                          />
                        )}
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {product.ProductName}
                          </Typography>
                          {product.Price && (
                            <Typography variant="body1" color="primary">
                              {product.Price.toLocaleString()} VND
                            </Typography>
                          )}
                          {product.Description && (
                            <Typography variant="body2" color="text.secondary">
                              {product.Description}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Không có sản phẩm nào
                </Typography>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>

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

export default FacilityDetails;
