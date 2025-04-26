import {
  Email,
  Language,
  LocationOn,
  SentimentDissatisfied,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { useState } from "react";
import api from "utils/__api__/company";
import useSWR from "swr";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";

const fetcher = (url) => get(url).then((res) => res.data);

const CompanyDetails = ({ company }) => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const router = useRouter();
  const {
    data: packages = [],
    error,
    isLoading,
  } = useSWR(
    company?.tourCompanyId
      ? `/tour-company/package/${company.tourCompanyId}`
      : null,
    fetcher
  );

  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const paginatedPackages = packages.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                  {isLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 400,
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : error ? (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 8,
                        px: 2,
                      }}
                    >
                      <Typography color="error">
                        Đã xảy ra lỗi khi tải dữ liệu
                      </Typography>
                    </Box>
                  ) : packages.length > 0 ? (
                    <>
                      <Grid container spacing={3}>
                        {paginatedPackages.map((pack) => (
                          <Grid item xs={12} sm={6} md={4} key={pack.tourId}>
                            <Card
                              sx={{
                                height: "100%",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(-8px)",
                                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                  "& img": {
                                    transform: "scale(1.1)",
                                  },
                                },
                                borderRadius: 2,
                                overflow: "hidden",
                              }}
                              onClick={() =>
                                router.push(`/tour-packages/${pack.tourId}`)
                              }
                            >
                              {/* Card content similar to tour packages page */}
                              <Box sx={{ position: "relative" }}>
                                <Box sx={{ height: 220, overflow: "hidden" }}>
                                  <img
                                    src={pack.imgs?.[0] || "/placeholder.jpg"}
                                    alt={pack.packageName}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      transition: "transform 0.3s ease",
                                    }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 12,
                                    right: 12,
                                    bgcolor: "error.main",
                                    color: "white",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontSize: "0.875rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Còn {pack.slot - pack.people}/ {pack.slot} chỗ
                                </Box>
                              </Box>

                              <Box sx={{ p: 2.5 }}>
                                <Typography
                                  sx={{
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                    mb: 1.5,
                                    height: 52,
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                  }}
                                >
                                  {pack.packageName}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    mb: 2,
                                    height: 60,
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                  }}
                                >
                                  {pack.description}
                                </Typography>

                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      Giá từ
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      color="primary.main"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      {pack.priceOfAdults.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VNĐ
                                    </Typography>
                                  </Box>
                                  <Typography
                                    variant="button"
                                    sx={{
                                      bgcolor: "primary.main",
                                      color: "white",
                                      px: 1.5,
                                      py: 1,
                                      borderRadius: 2,
                                      fontWeight: "bold",
                                      transition: "all 0.2s ease",
                                      "&:hover": {
                                        bgcolor: "primary.dark",
                                        transform: "translateY(-2px)",
                                        boxShadow:
                                          "0 4px 12px rgba(0,0,0,0.15)",
                                      },
                                      "&:active": {
                                        transform: "translateY(0)",
                                      },
                                    }}
                                  >
                                    Đặt ngay
                                  </Typography>
                                </Box>
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>

                      {totalPages > 1 && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 6,
                            mb: 4,
                            gap: 2,
                          }}
                        >
                          <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                          />
                          <Typography variant="body2" color="text.secondary">
                            Trang {page} / {totalPages}
                          </Typography>
                        </Box>
                      )}
                    </>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 8,
                        px: 2,
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
                        Không tìm thấy tour du lịch
                      </Typography>
                      <Typography color="grey.500">
                        Công ty này hiện chưa có tour du lịch nào
                      </Typography>
                    </Box>
                  )}
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
