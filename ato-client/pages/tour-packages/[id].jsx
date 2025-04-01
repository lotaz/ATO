import {
  AccessTime,
  Description,
  DirectionsBus,
  EventNote,
  Group,
  Hotel,
  LocationOn,
  Restaurant,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { H3, H4 } from "components/Typography";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { get } from "helpers/axios-helper";
import { currency } from "lib";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
const mockTour = {
  id: "tour-123",
  name: "Du lịch Đà Lạt - Thành phố mộng mơ",
  price: 5990000,
  duration: 4,
  maxGroupSize: 20,
  availableSeats: 8,
  destination: "Đà Lạt, Lâm Đồng",
  startDate: "2024-03-15",
  images: [
    "https://images.unsplash.com/photo-1528127269322-539801943592",
    "https://images.unsplash.com/photo-1470004914212-05527e49370b",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21",
  ],
  schedule: [
    {
      description: "Khởi hành từ TP.HCM - Đà Lạt",
      activities: [
        {
          type: "transport",
          description: "Xe đón tại sân bay Tân Sơn Nhất",
        },
        {
          type: "meal",
          description: "Ăn trưa tại nhà hàng địa phương",
        },
        {
          type: "accommodation",
          description: "Nhận phòng khách sạn 4 sao tại trung tâm",
        },
      ],
    },
    {
      description: "Khám phá thành phố Đà Lạt",
      activities: [
        {
          type: "transport",
          description: "Tham quan Dinh Bảo Đại",
        },
        {
          type: "meal",
          description: "Ăn trưa buffet tại nhà hàng",
        },
        {
          type: "transport",
          description: "Thăm quan Thiền Viện Trúc Lâm",
        },
      ],
    },
    {
      description: "Tham quan các điểm du lịch nổi tiếng",
      activities: [
        {
          type: "transport",
          description: "Thung lũng Tình Yêu",
        },
        {
          type: "meal",
          description: "Ăn trưa tại làng người Dao",
        },
        {
          type: "transport",
          description: "Tham quan đồi chè Cầu Đất",
        },
      ],
    },
    {
      description: "Trở về TP.HCM",
      activities: [
        {
          type: "meal",
          description: "Ăn sáng tại khách sạn",
        },
        {
          type: "transport",
          description: "Di chuyển ra sân bay Liên Khương",
        },
        {
          type: "transport",
          description: "Bay về TP.HCM",
        },
      ],
    },
  ],
};
const fetcher = (url) => get(url).then((res) => res.data);

const TourPackageDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `/tourist/tour/get-tour-by-id/${id}` : null,
    fetcher
  );
  const [selectedImage, setSelectedImage] = useState(0);

  const tour = mockTour;

  return (
    <ShopLayout2>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column - Main Content */}
          <Grid item xs={12} md={8}>
            {/* Main Image Gallery */}
            <Card sx={{ mb: 3 }}>
              <Box sx={{ position: "relative", height: 400 }}>
                <img
                  src={tour.images[selectedImage]}
                  alt={tour.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <ImageList sx={{ height: 100 }} cols={6}>
                {tour.images.map((img, index) => (
                  <ImageListItem
                    key={index}
                    sx={{
                      cursor: "pointer",
                      opacity: selectedImage === index ? 1 : 0.7,
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img}
                      alt={`Tour image ${index + 1}`}
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Card>

            {/* Tour Overview */}
            <Card sx={{ p: 3, mb: 3 }}>
              <H3 mb={2}>Tổng quan</H3>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText
                    primary="Thời gian"
                    secondary={`${tour.duration} ngày`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText
                    primary="Số lượng"
                    secondary={`${tour.maxGroupSize} người`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Điểm đến"
                    secondary={tour.destination}
                  />
                </ListItem>
              </List>
            </Card>

            {/* Tour Schedule */}
            <Card sx={{ p: 3, mb: 3 }}>
              <H3 mb={2}>Lịch trình</H3>
              {tour.schedule.map((day, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <H4 color="primary.main" mb={1}>
                    Ngày {index + 1}
                  </H4>
                  <Typography>{day.description}</Typography>
                  <List dense>
                    {day.activities.map((activity, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          {activity.type === "transport" ? (
                            <DirectionsBus />
                          ) : activity.type === "accommodation" ? (
                            <Hotel />
                          ) : activity.type === "meal" ? (
                            <Restaurant />
                          ) : (
                            <Description />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={activity.description} />
                      </ListItem>
                    ))}
                  </List>
                  {index < tour.schedule.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            </Card>
          </Grid>

          {/* Right Column - Booking Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, position: "sticky", top: 20 }}>
              <Typography variant="h4" color="primary.main" gutterBottom>
                {currency(tour.price)} VNĐ
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <EventNote />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ngày khởi hành"
                    secondary={new Date(tour.startDate).toLocaleDateString(
                      "vi-VN"
                    )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText
                    primary="Thời gian"
                    secondary={`${tour.duration} ngày`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText
                    primary="Số chỗ còn lại"
                    secondary={`${tour.availableSeats} chỗ`}
                  />
                </ListItem>
              </List>

              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => router.push(`/checkout/${id}`)}
              >
                Đặt tour
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default TourPackageDetails;
