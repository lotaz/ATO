import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { H2 } from "components/Typography";
import Footer from "components/footer/Footer";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { TimeType } from "types/tour.ts";

const fetcher = (url) => get(url).then((res) => res.data);

const TourPackages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const router = useRouter();

  const {
    data: tourPackages = [],
    error,
    isLoading,
  } = useSWR(
    "/agricultural-tour-package/get-list-agricultural-tour-packages",
    fetcher
  );

  const filteredPackages = tourPackages.filter((pack) => {
    const matchesSearch = pack.packageName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      pack.priceOfAdults >= priceRange[0] &&
      pack.priceOfAdults <= priceRange[1];
    const matchesDate =
      (!startDate || new Date(pack.startTime) >= new Date(startDate)) &&
      (!endDate || new Date(pack.endTime) <= new Date(endDate));

    return matchesSearch && matchesPrice && matchesDate;
  });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ShopLayout2>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            background: "linear-gradient(to right, #1976d2, #0d47a1)",
            py: { xs: 6, md: 10 },
            mb: 6,
          }}
        >
          <Container maxWidth="lg">
            <H2 color="white" textAlign="center" mb={2}>
              Tour Du Lịch
            </H2>
            <Typography color="white" textAlign="center" mb={4}>
              Khám phá những tour du lịch hấp dẫn trên khắp Việt Nam
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm tour..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: { height: 56, backgroundColor: "white" },
              }}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" mb={2}>
                  Bộ lọc tìm kiếm
                </Typography>
                <Typography gutterBottom>Khoảng giá (VNĐ)</Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => {
                    setPriceRange(newValue);
                    setPage(1);
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000000}
                  step={500000}
                  sx={{ mb: 3 }}
                />

                <TextField
                  type="date"
                  label="Ngày bắt đầu"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setPage(1);
                  }}
                  fullWidth
                  InputProps={{
                    sx: { height: 56 },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  type="date"
                  label="Ngày kết thúc"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setPage(1);
                  }}
                  fullWidth
                  InputProps={{
                    sx: { height: 56 },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={9}>
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
              ) : filteredPackages.length > 0 ? (
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
                              Còn {pack.slot} chỗ
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
                                alignItems: "center",
                                mb: 1.5,
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  bgcolor: "primary.main",
                                  mr: 1.5,
                                }}
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {new Date(pack.startTime).toLocaleDateString(
                                  "vi-VN",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  bgcolor: "primary.main",
                                  mr: 1.5,
                                }}
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {pack.durations} {TimeType[pack.durationsType]}
                              </Typography>
                            </Box>

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
                                  {pack.priceOfAdults.toLocaleString("vi-VN")}{" "}
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
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
                        sx={{
                          "& .MuiPaginationItem-root": {
                            fontSize: 16,
                            fontWeight: 500,
                            mx: 0.5,
                          },
                          "& .MuiPaginationItem-page.Mui-selected": {
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                              bgcolor: "primary.dark",
                            },
                          },
                          "& .MuiPaginationItem-page:hover": {
                            bgcolor: "primary.light",
                          },
                          "& .MuiPaginationItem-firstLast": {
                            bgcolor: "grey.100",
                          },
                        }}
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
                    Không tìm thấy tour du lịch phù hợp với tiêu chí tìm kiếm
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
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

export default TourPackages;
