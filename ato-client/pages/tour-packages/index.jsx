import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  Box,
  Card,
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
import { useRouter } from "next/router";
import { useState } from "react";
import { TimeType } from "types/tour.ts";
// Add these imports at the top
import { get } from "helpers/axios-helper";
import useSWR from "swr";

// Add this fetcher function
const fetcher = (url) => get(url).then((res) => res.data);

const TourPackages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const router = useRouter();

  // Replace mock data with API call
  const {
    data: tourPackages = [],
    error,
    isLoading,
  } = useSWR(
    "/agricultural-tour-package/get-list-agricultural-tour-packages",
    fetcher
  );
  console.log("----", tourPackages);

  const filteredPackages = tourPackages.filter((pack) => {
    const matchesSearch = pack.packageName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      pack.price >= priceRange[0] && pack.price <= priceRange[1];
    // Update location filter if needed (currently not in API response)
    const matchesLocation = !selectedLocation || true;
    // Update category filter if needed (currently not in API response)
    const matchesCategory = !selectedCategory || true;
    const matchesDate =
      (!startDate || new Date(pack.startTime) >= startDate) &&
      (!endDate || new Date(pack.endTime) <= endDate);

    return (
      matchesSearch &&
      matchesPrice &&
      matchesLocation &&
      matchesCategory &&
      matchesDate
    );
  });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Add pagination handler
  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Then in your JSX, update the mapping to use paginatedPackages instead of filteredPackages
  <Grid container spacing={3}>
    {paginatedPackages.map((pack) => (
      <Grid item xs={12} sm={6} md={4} key={pack.id}>
        <Card sx={{ height: "100%" }}>
          <Box
            sx={{
              height: 200,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={pack.imageUrl}
              alt={pack.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom noWrap>
              {pack.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {pack.location}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {pack.duration}
            </Typography>
            <Typography variant="h6" color="primary.main">
              {pack.price.toLocaleString("vi-VN")} VNĐ
            </Typography>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>;

  return (
    <ShopLayout2>
      {/* Hero Section */}
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
          {/* Add search bar here, before the Grid container */}
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
            {/* Search Filters */}
            <Grid item xs={12} md={3}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" mb={2}>
                  Bộ lọc tìm kiếm
                </Typography>
                {/* Remove the original search TextField from here */}
                <Typography gutterBottom>Khoảng giá (VNĐ)</Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => {
                    setPriceRange(newValue);
                    setPage(1); // Reset page
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
                  value={startDate ? startDate.split("T")[0] : ""}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setPage(1);
                  }}
                  fullWidth
                  InputProps={{
                    sx: { height: 56 }, // Add this
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  type="date"
                  label="Ngày kết thúc"
                  value={endDate ? endDate.split("T")[0] : ""}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setPage(1);
                  }}
                  fullWidth
                  InputProps={{
                    sx: { height: 56 }, // Add this
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Card>
            </Grid>

            {/* Tour Packages Grid */}
            <Grid item xs={12} md={9}>
              {filteredPackages.length > 0 ? (
                <>
                  <Grid container spacing={3}>
                    {paginatedPackages.map((pack) => (
                      <Grid item xs={12} sm={6} md={4} key={pack.tourId}>
                        <Card
                          sx={{ height: "100%", cursor: "pointer" }}
                          onClick={() =>
                            router.push(`/tour-packages/${pack.tourId}`)
                          }
                        >
                          <Box
                            sx={{
                              height: 200,
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            <img
                              src={pack.imgs?.[0] || "/placeholder.jpg"}
                              alt={pack.packageName}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom noWrap>
                              {pack.packageName}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              mb={1}
                            >
                              {new Date(pack.startTime).toLocaleDateString()} -{" "}
                              {new Date(pack.endTime).toLocaleDateString()}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              mb={1}
                            >
                              {pack.durations} {TimeType[pack.durationsType]}
                            </Typography>
                            <Typography variant="h6" color="primary.main">
                              {pack.price.toLocaleString("vi-VN")} VNĐ
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {totalPages > 1 && (
                    <Box display="flex" justifyContent="center" mt={4}>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            fontSize: 16,
                          },
                        }}
                      />
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
