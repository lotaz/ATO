import { AccessTime, EventNote, Group, LocationOn } from "@mui/icons-material";
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
import FeedbackSection from "components/feedback/FeedbackSection";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { get } from "helpers/axios-helper";
import { currency } from "lib";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { TimeType } from "types/tour.ts";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { HoverImageGallery } from "components/image-list";
const fetcher = (url) => get(url).then((res) => res.data);

const TourPackageDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: tour,
    error,
    isLoading,
  } = useSWR(
    id
      ? `/agricultural-tour-package/get-agricultural-tour-package/${id}`
      : null,
    fetcher
  );
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tour details</div>;
  if (!tour) return <div>Tour not found</div>;

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
                  src={tour.imgs?.[selectedImage] || "/placeholder.jpg"}
                  alt={tour.packageName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <ImageList sx={{ height: 100 }} cols={6}>
                {tour.imgs?.map((img, index) => (
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
              <Typography paragraph>{tour.description}</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText
                    primary="Thời gian"
                    secondary={`${tour.durations} ${
                      TimeType[tour.durationsType]
                    }`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText
                    primary="Số lượng"
                    secondary={`${tour.slot} người`}
                  />
                </ListItem>
              </List>
            </Card>

            {/* Tour Destinations */}
            {tour.tourDestinations?.length > 0 && (
              <Card sx={{ p: 3, mb: 3 }}>
                <H3 mb={2}>Lịch trình điểm đến</H3>
                <Timeline position="alternate">
                  {tour.tourDestinations.map((destination, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                        {index < tour.tourDestinations.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent
                        sx={{
                          position: "relative",
                          "&:hover .image-gallery": {
                            display: "block",
                          },
                        }}
                      >
                        <Card sx={{ p: 3, mb: 3, boxShadow: 3 }}>
                          <Box
                            display="flex"
                            flexDirection={{ xs: "column", md: "row" }}
                            gap={3}
                          >
                            {/* Destination Images */}
                            {destination.activity?.imgs?.length > 0 && (
                              <HoverImageGallery
                                images={destination.activity.imgs}
                                title={destination.title}
                              />
                            )}
                            {/* Destination Details */}
                            <Box flex={2}>
                              <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                mb={1}
                              >
                                <LocationOn color="primary" />
                                <H4 color="primary.main">
                                  {destination.title} (Thứ tự:{" "}
                                  {destination.visitOrder})
                                </H4>
                              </Box>

                              <Typography paragraph>
                                {destination.description}
                              </Typography>

                              {/* Activity Section */}
                              {destination.activity && (
                                <Box
                                  sx={{
                                    mt: 2,
                                    p: 2,
                                    bgcolor: "background.paper",
                                    borderRadius: 1,
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                  >
                                    Hoạt động:
                                  </Typography>
                                  <Typography>
                                    {destination.activity.activityName} (
                                    {destination.activity.durationInHours} giờ)
                                  </Typography>
                                  <Typography variant="body2">
                                    {destination.activity.description}
                                  </Typography>
                                  <Typography variant="body2">
                                    Địa điểm: {destination.activity.location}
                                  </Typography>
                                </Box>
                              )}

                              {/* Driver Section */}
                              {destination.driver && (
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant="subtitle1">
                                    Phương tiện:
                                  </Typography>
                                  <Typography>
                                    {destination.driver.driverName} (
                                    {destination.driver.vehicleType})
                                  </Typography>
                                  <Typography variant="body2">
                                    SĐT: {destination.driver.phoneNumber}
                                  </Typography>
                                </Box>
                              )}

                              {/* Accommodation Section */}
                              {destination.accommodation && (
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant="subtitle1">
                                    Nơi ở:
                                  </Typography>
                                  <Typography>
                                    {
                                      destination.accommodation
                                        .accommodationName
                                    }
                                    {destination.accommodation.star &&
                                      ` (${destination.accommodation.star} sao)`}
                                  </Typography>
                                  <Typography variant="body2">
                                    Địa chỉ: {destination.accommodation.address}
                                  </Typography>
                                  <Typography variant="body2">
                                    SĐT: {destination.accommodation.phoneNumber}
                                  </Typography>
                                </Box>
                              )}

                              {index < tour.tourDestinations.length - 1 && (
                                <Divider sx={{ mt: 2 }} />
                              )}
                            </Box>
                          </Box>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Card>
            )}

            {/* Tour Guides */}
            {tour.tourGuides?.length > 0 && (
              <Card sx={{ p: 3, mb: 3 }}>
                <H3 mb={2}>Hướng dẫn viên</H3>
                {tour.tourGuides.map((guide, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <img
                        src={guide.account?.avatarURL || "/placeholder.jpg"}
                        alt={guide.account?.fullname}
                        style={{ width: 60, height: 60, borderRadius: "50%" }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {guide.account?.fullname}
                        </Typography>
                        <Typography variant="body2">
                          Đánh giá: {guide.rating}/5
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Giới thiệu:</strong> {guide.bio}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Ngôn ngữ:</strong> {guide.languages}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Chuyên môn:</strong> {guide.expertiseArea}
                      </Typography>
                    </Box>

                    {index < tour.tourGuides.length - 1 && (
                      <Divider sx={{ mt: 2 }} />
                    )}
                  </Box>
                ))}
              </Card>
            )}

            <FeedbackSection entityId={id} entityType="tour" />
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
                    secondary={new Date(tour.startTime).toLocaleDateString(
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
                    secondary={`${tour.durations} ${
                      TimeType[tour.durationsType]
                    }`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText
                    primary="Số chỗ còn lại"
                    secondary={`${tour.slot} chỗ`}
                  />
                </ListItem>
              </List>

              <Button
                onClick={() => router.push(`/tour-packages/book?id=${id}`)}
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Đặt tour ngay
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

// Remove the existing ImageList component for destination images
export default TourPackageDetails;
