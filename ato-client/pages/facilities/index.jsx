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
} from "@mui/material";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { H2 } from "components/Typography";
import Footer from "components/footer/Footer";
import SEO from "components/SEO";
import { useState, useEffect } from "react";
import { get } from "helpers/axios-helper";
import { LocationOn } from "@mui/icons-material";
import { TextField, MenuItem, Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";

const FacilityCardSkeleton = () => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    }}
  >
    <Skeleton variant="rectangular" height={200} />
    <CardContent sx={{ flexGrow: 1, p: 3 }}>
      <Skeleton variant="text" width="80%" height={40} sx={{ mb: 2 }} />
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={20} />
        <Skeleton variant="text" width="90%" height={20} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="rectangular" width={100} height={32} />
          <Skeleton variant="rectangular" width={100} height={32} />
        </Box>
      </Box>
      <Skeleton variant="text" width="70%" height={20} />
    </CardContent>
  </Card>
);

const FacilityCard = ({ facility }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      },
    }}
  >
    <CardMedia
      component="img"
      height="200"
      image={facility.logoURL || "/placeholder.jpg"}
      alt={facility.TouristFacilityName}
      sx={{
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        objectFit: "cover",
      }}
    />
    <CardContent
      sx={{
        flexGrow: 1,
        p: 3,
        "&:last-child": {
          pb: 3,
        },
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{
          fontWeight: 600,
          mb: 2,
          color: "text.primary",
          minHeight: "64px",
        }}
      >
        {facility.touristFacilityName}
      </Typography>

      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: "grey.50",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 500,
            mb: 1,
            color: "text.secondary",
          }}
        >
          Thông tin liên hệ
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {facility.contactInfor}
          </Typography>
          {facility.phone && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Điện thoại: {facility.phone}
            </Typography>
          )}
          {facility.emailTouristFacility && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Email: {facility.emailTouristFacility}
            </Typography>
          )}
        </Box>
      </Box>

      {facility.Certifications?.length > 0 && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: "grey.50",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              mb: 1,
              color: "text.secondary",
            }}
          >
            Chứng nhận
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
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

      <Box
        sx={{
          mt: "auto",
          pt: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocationOn fontSize="small" />
          {[facility.ward_name, facility.district_name, facility.province_name]
            .filter(Boolean)
            .join(", ")}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const FacilityList = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filters, setFilters] = useState({
    search: "",
    province: "",
    district: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await get("/tourist-facility");
        setFacilities(response.data);
        setFilteredFacilities(response.data);
      } catch (error) {
        console.error("Failed to fetch facilities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    const filtered = facilities.filter((facility) => {
      return (
        facility.touristFacilityName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) &&
        (filters.province
          ? facility.province_name === filters.province
          : true) &&
        (filters.district ? facility.district_name === filters.district : true)
      );
    });
    setFilteredFacilities(filtered);
    setVisibleCount(6); // Reset visible count when filters change
  }, [filters, facilities]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 200
    )
      return;
    setVisibleCount((prev) => prev + 6);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const provinces = [
    ...new Set(facilities.map((f) => f.province_name).filter(Boolean)),
  ];
  const districts = [
    ...new Set(facilities.map((f) => f.district_name).filter(Boolean)),
  ];

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
            Cơ sở du lịch
          </H2>
          <Typography
            color="white"
            textAlign="center"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Khám phá các cơ sở du lịch hiện đại phục vụ cho du lịch nông nghiệp
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <SEO title="Cơ sở du lịch" />

        {/* Filter Section */}
        <Box sx={{ mb: 4, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Tìm kiếm cơ sở"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Tỉnh/Thành phố"
                value={filters.province}
                onChange={(e) =>
                  setFilters({ ...filters, province: e.target.value })
                }
              >
                <MenuItem value="">Tất cả</MenuItem>
                {provinces.map((province) => (
                  <MenuItem key={province} value={province}>
                    {province}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Quận/Huyện"
                value={filters.district}
                onChange={(e) =>
                  setFilters({ ...filters, district: e.target.value })
                }
              >
                <MenuItem value="">Tất cả</MenuItem>
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Danh sách cơ sở du lịch
            </Typography>
            <Typography color="text.secondary">
              Hiển thị {Math.min(visibleCount, filteredFacilities.length)} trong
              tổng số {filteredFacilities.length} cơ sở
            </Typography>
          </Grid>

          {/* Facility List */}
          <Grid item xs={12}>
            {isLoading ? (
              <Grid container spacing={3}>
                {Array.from(new Array(6)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <FacilityCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : filteredFacilities.length > 0 ? (
              <Grid container spacing={3}>
                {filteredFacilities.slice(0, visibleCount).map((facility) => (
                  <Grid
                    onClick={() =>
                      router.push("/facilities/" + facility.touristFacilityId)
                    }
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={facility.touristFacilityId}
                    sx={{ cursor: "pointer" }}
                  >
                    <FacilityCard facility={facility} />
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
                <Typography variant="h6" color="grey.600" gutterBottom>
                  Không tìm thấy cơ sở du lịch
                </Typography>
                <Typography color="grey.500">
                  Hiện không có cơ sở du lịch nào phù hợp với bộ lọc
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
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

export default FacilityList;
