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
import HtmlParagraph from "components/HtmlParagraph";
import { H2 } from "components/Typography";
import Footer from "components/footer/Footer";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import useSWR from "swr";
import { TimeType } from "types/tour.ts";
import { useEffect, useState, useCallback } from "react";

const fetcher = (url) => get(url).then((res) => res.data);

// Add Skeleton component
const SkeletonCard = () => (
  <Card sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
    <Box sx={{ height: 220, bgcolor: "grey.300" }} />
    <Box sx={{ p: 2.5 }}>
      <Box sx={{ height: 52, bgcolor: "grey.300", mb: 1.5 }} />
      <Box sx={{ height: 60, bgcolor: "grey.300", mb: 2 }} />
      <Box sx={{ height: 20, bgcolor: "grey.300", mb: 1.5 }} />
      <Box sx={{ height: 20, bgcolor: "grey.300", mb: 2 }} />
      <Box sx={{ height: 40, bgcolor: "grey.300" }} />
    </Box>
  </Card>
);

const TourPackages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visibleItems, setVisibleItems] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allPackages, setAllPackages] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await get(
          "/agricultural-tour-package/get-list-agricultural-tour-packages"
        );
        setAllPackages(response.data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = allPackages.filter((pack) => {
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

  const loadMoreItems = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async loading
    setVisibleItems((prev) => prev + 3);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    if (visibleItems >= filteredPackages.length) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, visibleItems, filteredPackages]);

  return (
    <ShopLayout2>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            backgroundImage: "url('/assets/small-banners/blur-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
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
                    setVisibleItems(3);
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100000000}
                  step={500000}
                  sx={{ mb: 3 }}
                />

                <TextField
                  type="date"
                  label="Ngày bắt đầu"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
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
              {allPackages.length === 0 ? (
                <Grid container spacing={3}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <SkeletonCard />
                    </Grid>
                  ))}
                </Grid>
              ) : filteredPackages.length > 0 ? (
                <>
                  <Grid container spacing={3}>
                    {filteredPackages.slice(0, visibleItems).map((pack) => (
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
                              <HtmlParagraph html={pack.description} />
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

                  {isLoadingMore && (
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <SkeletonCard />
                        </Grid>
                      ))}
                    </Grid>
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
