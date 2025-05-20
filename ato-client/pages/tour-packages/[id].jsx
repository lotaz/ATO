import {
  AccessTime,
  CalendarMonth,
  EventNote,
  Group,
  LocationOn,
} from "@mui/icons-material";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { H3 } from "components/Typography";
import FeedbackSection from "components/feedback/FeedbackSection";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { get } from "helpers/axios-helper";
import { currency } from "lib";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { TimeType } from "types/tour.ts";
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

  console.log("tour", tour);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tour details</div>;
  if (!tour) return <div>Tour not found</div>;

  const sortedDestinations =
    tour?.tourDestinations?.sort((a, b) => a.visitOrder - b.visitOrder) || [];
  console.log("des", tour?.tourDestinations);

  return (
    <ShopLayout2>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Box mb={4}>
          <Typography variant="h4" color="primary.main" gutterBottom>
            <strong>{tour.packageName}</strong>
          </Typography>
          <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
            <Chip
              icon={<CalendarMonth />}
              label={new Date(tour.startTime).toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<AccessTime />}
              label={`${tour.durations} ${TimeType[tour.durationsType]}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<Group />}
              label={` ${tour.slot - tour.people} / ${tour.slot} chỗ trống`}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
        <Grid container spacing={3}>
          {/* Left Column - Main Content */}
          <Grid item xs={12} md={8}>
            {/* Main Image Gallery */}
            <Card sx={{ mb: 3, overflow: "hidden", boxShadow: 3 }}>
              <Box sx={{ position: "relative", height: 500 }}>
                <img
                  src={tour.imgs?.[selectedImage] || "/placeholder.jpg"}
                  alt={tour.packageName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    p: 2,
                    color: "white",
                  }}
                ></Box>
              </Box>

              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <ImageList
                  sx={{
                    height: 100,
                    gap: "8px!important",
                    mb: 0,
                    "& .MuiImageListItem-root": {
                      borderRadius: 1,
                      overflow: "hidden",
                    },
                  }}
                  cols={6}
                >
                  {tour.imgs?.map((img, index) => (
                    <ImageListItem
                      key={index}
                      sx={{
                        cursor: "pointer",
                        opacity: selectedImage === index ? 1 : 0.7,
                        border: selectedImage === index ? 2 : 0,
                        borderColor: "primary.main",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          opacity: 1,
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`Tour image ${index + 1}`}
                        style={{
                          height: "100%",
                          objectFit: "cover",
                          imageRendering: "-webkit-optimize-contrast",
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                          WebkitFontSmoothing: "subpixel-antialiased",
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Card>

            <Card sx={{ p: 3, mb: 3 }}>
              <Typography
                variant="h5"
                color="primary.main"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Tổng quan Tour
              </Typography>

              <Box
                sx={{
                  bgcolor: "grey.50",
                  p: 2.5,
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    lineHeight: 1.8,
                    color: "text.primary",
                    fontSize: "1.1rem",
                  }}
                >
                  {tour.description}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: "primary.light",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <AccessTime sx={{ color: "primary.main", mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Thời gian tour
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {tour.durations} {TimeType[tour.durationsType]}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: "primary.light",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <EventNote sx={{ color: "primary.main", mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Thời gian
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      Bắt đầu:{" "}
                      {new Date(tour.startTime).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Kết thúc:{" "}
                      {new Date(tour.endTime).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: "primary.light",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Group sx={{ color: "primary.main", mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Số lượng khách
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      Còn {tour.slot - tour.people} / {tour.slot} chỗ trống
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>

            {/* Tour Destinations */}
            {sortedDestinations?.length > 0 && (
              <Card sx={{ p: 3, mb: 3 }}>
                <H3 mb={2}>Lịch trình điểm đến</H3>
                <Timeline
                  sx={{
                    p: 0,
                    m: 0,
                    [`& .MuiTimelineItem-root`]: {
                      minHeight: "auto",
                      "&:before": {
                        display: "none",
                      },
                    },
                    [`& .MuiTimelineSeparator-root`]: {
                      minHeight: "100%",
                    },
                    [`& .MuiTimelineContent-root`]: {
                      px: 3,
                      py: 1,
                    },
                  }}
                >
                  {sortedDestinations.map((destination, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot
                          sx={{
                            bgcolor: "primary.main",
                            width: 12,
                            height: 12,
                          }}
                        />
                        {index < sortedDestinations.length - 1 && (
                          <TimelineConnector sx={{ bgcolor: "gray.main" }} />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Card
                          onClick={() => setSelectedDestination(destination)}
                          sx={{
                            p: 3,
                            mb: 2,
                            boxShadow: 3,
                            cursor: "pointer",
                            "&:hover": {
                              boxShadow: 6,
                              transform: "translateY(-4px)",
                              transition: "all 0.3s ease-in-out",
                              bgcolor: "grey.100",
                            },
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                              bgcolor: "primary.main",
                              color: "white",
                              p: 1.5,
                              borderRadius: 1,
                            }}
                          >
                            <LocationOn />
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                              {destination.title}
                              <Typography variant="caption" display="block">
                                {new Date(destination.startTime).toLocaleString(
                                  "vi-VN",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                                {" - "}
                                {new Date(destination.endTime).toLocaleString(
                                  "vi-VN",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </Typography>
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                              }}
                            >
                              <Chip
                                label={`Điểm dừng ${destination.visitOrder}`}
                                size="small"
                                sx={{
                                  bgcolor: "rgba(255, 255, 255, 0.2)",
                                  color: "white",
                                  fontWeight: 500,
                                  mb: 1,
                                  "& .MuiChip-label": {
                                    px: 1,
                                  },
                                }}
                              />
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDestination(destination);
                                }}
                                sx={{
                                  color: "white",
                                  borderColor: "rgba(255, 255, 255, 0.5)",
                                  "&:hover": {
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    borderColor: "white",
                                  },
                                  textTransform: "none",
                                  minWidth: 100,
                                }}
                              >
                                Xem chi tiết
                              </Button>
                            </Box>
                          </Box>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>

                <Modal
                  open={!!selectedDestination}
                  onClose={() => setSelectedDestination(null)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      p: 3,
                      maxWidth: 800,
                      maxHeight: "90vh",
                      overflow: "auto",
                    }}
                  >
                    {selectedDestination && (
                      <>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ color: "primary.main" }}
                        >
                          <strong>{selectedDestination.title}</strong>
                        </Typography>

                        <Grid
                          item
                          xs={12}
                          md={
                            selectedDestination.activity?.imgs?.length > 0
                              ? 12
                              : 12
                          }
                        >
                          <Typography paragraph>
                            {selectedDestination.description}
                          </Typography>

                          {selectedDestination.activity && (
                            <Box>
                              <Typography variant="body2" gutterBottom>
                                <strong>Thời gian:</strong>{" "}
                                {selectedDestination.activity.durationInHours}{" "}
                                giờ
                              </Typography>
                              {selectedDestination.activity.breakTimeInMinutes >
                                0 && (
                                <Typography variant="body2" gutterBottom>
                                  <strong>Thời gian nghỉ:</strong>{" "}
                                  {
                                    selectedDestination.activity
                                      .breakTimeInMinutes
                                  }{" "}
                                  phút
                                </Typography>
                              )}
                              <Typography variant="body2" gutterBottom>
                                <strong>Mô tả:</strong>{" "}
                                {selectedDestination.activity.description}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                <strong>Địa điểm:</strong>{" "}
                                {selectedDestination.activity.location}
                              </Typography>
                              {selectedDestination.activity.imgs?.length >
                                0 && (
                                <Box>
                                  <Typography variant="subtitle2" gutterBottom>
                                    <strong>Hình ảnh hoạt động:</strong>
                                  </Typography>
                                  <ImageList cols={4} rowHeight={164}>
                                    {selectedDestination.activity.imgs.map(
                                      (img, index) => (
                                        <ImageListItem key={index}>
                                          <img
                                            src={img}
                                            alt={`Activity image ${index + 1}`}
                                            loading="lazy"
                                            style={{ objectFit: "cover" }}
                                          />
                                        </ImageListItem>
                                      )
                                    )}
                                  </ImageList>
                                </Box>
                              )}
                            </Box>
                          )}

                          <Grid container spacing={2}>
                            {selectedDestination.driver && (
                              <Box sx={{ mx: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                  <strong>Phương tiện: </strong>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  <strong>Lái Xe: </strong>
                                  {selectedDestination.driver.driverName}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  <strong>Loại Xe: </strong>{" "}
                                  {selectedDestination.driver.vehicleType} chỗ
                                </Typography>
                                {selectedDestination.driver.imgs?.length >
                                  0 && (
                                  <Box>
                                    <Typography
                                      variant="subtitle2"
                                      gutterBottom
                                    >
                                      <strong>Hình ảnh :</strong>
                                    </Typography>
                                    <ImageList>
                                      {selectedDestination.driver.imgs.map(
                                        (img, index) => (
                                          <ImageListItem key={index}>
                                            <img
                                              src={img}
                                              alt={`Activity image ${
                                                index + 1
                                              }`}
                                              loading="lazy"
                                              style={{ objectFit: "cover" }}
                                            />
                                          </ImageListItem>
                                        )
                                      )}
                                    </ImageList>
                                  </Box>
                                )}
                              </Box>
                            )}
                            {selectedDestination.accommodation && (
                              <Box sx={{ mx: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                  <strong>Nơi ở</strong>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  {
                                    selectedDestination.accommodation
                                      .accommodationName
                                  }
                                  {selectedDestination.accommodation.star &&
                                    ` (${selectedDestination.accommodation.star} sao)`}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  <strong>Địa chỉ: </strong>
                                  {selectedDestination.accommodation.address}
                                </Typography>
                                <Typography variant="body2">
                                  <strong> SĐT: </strong>
                                  {
                                    selectedDestination.accommodation
                                      .phoneNumber
                                  }
                                </Typography>
                                <Box>
                                  <Typography variant="subtitle2" gutterBottom>
                                    <strong>Hình ảnh :</strong>
                                  </Typography>
                                  <ImageList>
                                    {selectedDestination.accommodation.imgs.map(
                                      (img, index) => (
                                        <ImageListItem key={index}>
                                          <img
                                            src={img}
                                            alt={`Activity image ${index + 1}`}
                                            loading="lazy"
                                            style={{ objectFit: "cover" }}
                                          />
                                        </ImageListItem>
                                      )
                                    )}
                                  </ImageList>
                                </Box>
                              </Box>
                            )}
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Box>
                </Modal>
              </Card>
            )}

            {/* Tour Guides */}
            {tour.tourGuides?.length > 0 && (
              <Card sx={{ p: 3, mb: 3 }}>
                <H3 mb={2}>Hướng dẫn viên</H3>
                {tour.tourGuides.map((guide, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
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
                        <strong>Số điện thoại:</strong>{" "}
                        {guide.account.phoneNumber}
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
            <Card
              sx={{
                position: "sticky",
                top: 80, // Increased from 20 to account for header height
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.2)",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                },
                zIndex: 10, // Added to ensure proper stacking
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)",
                  p: 3,
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, fontSize: "2.5rem" }}
                  >
                    {currency(tour.priceOfAdults)}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    VNĐ
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  /người
                </Typography>
              </Box>

              <Box sx={{ p: 3, bgcolor: "white" }}>
                <List>
                  <ListItem
                    sx={{
                      py: 2.5,
                      px: 2,
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <ListItemIcon>
                      <EventNote sx={{ color: "primary.main", fontSize: 28 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Ngày khởi hành
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, color: "#2c3e50" }}
                        >
                          {new Date(tour.startTime).toLocaleDateString(
                            "vi-VN",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: 2.5,
                      px: 2,
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <ListItemIcon>
                      <AccessTime
                        sx={{ color: "primary.main", fontSize: 28 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Thời gian
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, color: "#2c3e50" }}
                        >
                          {`${tour.durations} ${TimeType[tour.durationsType]}`}
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: 2.5,
                      px: 2,
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                      borderRadius: 2,
                    }}
                  >
                    <ListItemIcon>
                      <Group sx={{ color: "primary.main", fontSize: 28 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Số chỗ còn lại
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: tour.slot < 5 ? "#e74c3c" : "#27ae60",
                          }}
                        >
                          {`${tour.slot - tour.people}/${tour.slot} chỗ`}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>

                <Button
                  onClick={() => router.push(`/tour-packages/book?id=${id}`)}
                  fullWidth
                  size="large"
                  sx={{
                    mt: 4,
                    py: 2,
                    background:
                      "linear-gradient(45deg, #e74c3c 30%, #f39c12 90%)",
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "0 4px 20px 0px rgba(231, 76, 60, 0.25)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #f39c12 30%, #e74c3c 90%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px 0px rgba(231, 76, 60, 0.35)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Đặt tour ngay
                </Button>

                <Typography
                  variant="caption"
                  align="center"
                  sx={{
                    display: "block",
                    mt: 3,
                    color: "text.secondary",
                    fontStyle: "italic",
                    px: 2,
                  }}
                >
                  * Giá có thể thay đổi tùy theo thời điểm
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

// Remove the existing ImageList component for destination images
export default TourPackageDetails;
