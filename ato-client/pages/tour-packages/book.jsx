import { LocationOn } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Box,
  Card,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import ShopLayout2 from "components/layouts/ShopLayout2";
import TourBookingForm from "components/tour/TourBookingForm";
import { H2, H3 } from "components/Typography";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => get(url).then((res) => res.data);

const BookTourPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedDestination, setSelectedDestination] = useState(null);

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
  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography color="error">Error loading tour details</Typography>
      </Box>
    );
  if (!tour)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography>Tour not found</Typography>
      </Box>
    );

  const sortedDestinations =
    tour?.tourDestinations?.sort((a, b) => a.visitOrder - b.visitOrder) || [];

  return (
    <ShopLayout2>
      <Box
        sx={{
          background: "linear-gradient(to right, #1976d2, #0d47a1)",
          py: { xs: 6, md: 10 },
          mb: 6,
          boxShadow: 3,
        }}
      >
        <Container maxWidth="lg">
          <H2 color="white" textAlign="center" mb={2}>
            Đặt tour
          </H2>
          <Typography
            color="white"
            textAlign="center"
            mb={4}
            variant="h5"
            sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
          >
            {tour.packageName}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: "100%", boxShadow: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    left: 0,
                    width: 60,
                    height: 3,
                    bgcolor: "primary.main",
                    borderRadius: 1,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Thông tin tour
                </Typography>
              </Box>
              <Typography
                paragraph
                sx={{
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  color: "text.secondary",
                }}
              >
                {tour.description}
              </Typography>

              {sortedDestinations?.length > 0 && (
                <Card sx={{ p: 3, mb: 3, bgcolor: "grey.50", boxShadow: 1 }}>
                  <H3 mb={3} color="primary.main">
                    Lịch trình điểm đến
                  </H3>
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
                              boxShadow: 2,
                            }}
                          />
                          {index < sortedDestinations.length - 1 && (
                            <TimelineConnector
                              sx={{ bgcolor: "gray.main", height: "100%" }}
                            />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Card
                            onClick={() => setSelectedDestination(destination)}
                            sx={{
                              p: 2,
                              mb: 2,
                              cursor: "pointer",
                              bgcolor: "primary.main",
                              color: "white",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                              },
                            }}
                          >
                            <Box display="flex" alignItems="center" gap={2}>
                              <LocationOn sx={{ fontSize: 28 }} />
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ mb: 0.5, fontWeight: 600 }}>
                                  {destination.title}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "0.85rem", opacity: 0.9 }}
                                >
                                  {new Date(
                                    destination.startTime
                                  ).toLocaleTimeString("vi-VN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                  {" - "}
                                  {new Date(
                                    destination.endTime
                                  ).toLocaleTimeString("vi-VN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  textAlign: "right",
                                  borderLeft: "1px solid rgba(255,255,255,0.2)",
                                  pl: 2,
                                }}
                              >
                                <Typography
                                  sx={{ fontSize: "0.9rem", mb: 0.5 }}
                                >
                                  Điểm dừng: {destination.visitOrder}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    "&:hover": { opacity: 0.8 },
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDestination(destination);
                                  }}
                                >
                                  Xem chi tiết
                                </Typography>
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
                        p: 4,
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        overflow: "auto",
                        width: { xs: "95%", sm: "80%", md: "70%" },
                        boxShadow: 24,
                      }}
                    >
                      {selectedDestination && (
                        <>
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                              color: "primary.main",
                              mb: 3,
                              pb: 2,
                              borderBottom: "2px solid",
                              borderColor: "primary.main",
                            }}
                          >
                            <strong>{selectedDestination.title}</strong>
                          </Typography>

                          <Grid container spacing={4}>
                            <Grid item xs={12}>
                              <Typography
                                paragraph
                                sx={{
                                  fontSize: "1.1rem",
                                  lineHeight: 1.8,
                                  color: "text.secondary",
                                  mb: 4,
                                }}
                              >
                                {selectedDestination.description}
                              </Typography>

                              {selectedDestination.activity && (
                                <Box sx={{ mb: 3 }}>
                                  <Grid container spacing={2}>
                                    {/* Left side - Text content */}
                                    <Grid item xs={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        color="primary.main"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Thông tin hoạt động</strong>
                                      </Typography>
                                      <Typography variant="body2" gutterBottom>
                                        <strong>Thời gian:</strong>{" "}
                                        {
                                          selectedDestination.activity
                                            .durationInHours
                                        }{" "}
                                        giờ
                                      </Typography>
                                      {selectedDestination.activity
                                        .breakTimeInMinutes > 0 && (
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                        >
                                          <strong>Thời gian nghỉ:</strong>{" "}
                                          {
                                            selectedDestination.activity
                                              .breakTimeInMinutes
                                          }{" "}
                                          phút
                                        </Typography>
                                      )}
                                      <Typography variant="body2" gutterBottom>
                                        <strong>Địa điểm:</strong>{" "}
                                        {selectedDestination.activity.location}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          mt: 2,
                                          lineHeight: 1.6,
                                        }}
                                      >
                                        <strong>Mô tả:</strong>{" "}
                                        {
                                          selectedDestination.activity
                                            .description
                                        }
                                      </Typography>
                                    </Grid>

                                    {/* Right side - Images */}
                                    {selectedDestination.activity.imgs?.length >
                                      0 && (
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                          color="primary.main"
                                          sx={{ mb: 1 }}
                                        >
                                          <strong>Hình ảnh hoạt động</strong>
                                        </Typography>
                                        <ImageList
                                          cols={2}
                                          gap={8}
                                          sx={{
                                            mb: 1,
                                            "& .MuiImageListItem-root": {
                                              overflow: "hidden",
                                              borderRadius: 1,
                                            },
                                          }}
                                        >
                                          {selectedDestination.activity.imgs.map(
                                            (img, index) => (
                                              <ImageListItem
                                                key={index}
                                                sx={{
                                                  height: "120px !important",
                                                  "&:hover img": {
                                                    transform: "scale(1.1)",
                                                    transition:
                                                      "transform 0.3s ease-in-out",
                                                  },
                                                }}
                                              >
                                                <img
                                                  src={img}
                                                  alt={`Activity image ${
                                                    index + 1
                                                  }`}
                                                  loading="lazy"
                                                  style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition:
                                                      "transform 0.3s ease-in-out",
                                                  }}
                                                />
                                              </ImageListItem>
                                            )
                                          )}
                                        </ImageList>
                                      </Grid>
                                    )}
                                  </Grid>
                                </Box>
                              )}
                              {selectedDestination.driver && (
                                <Box sx={{ mb: 3 }}>
                                  <Grid container spacing={2}>
                                    {/* Left side - Text content */}
                                    <Grid item xs={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        color="primary.main"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Phương tiện</strong>
                                      </Typography>
                                      <Typography variant="body2" gutterBottom>
                                        <strong>Lái Xe:</strong>{" "}
                                        {selectedDestination.driver.driverName}
                                      </Typography>
                                      <Typography variant="body2" gutterBottom>
                                        <strong>Loại Xe:</strong>{" "}
                                        {selectedDestination.driver.vehicleType}{" "}
                                        chỗ
                                      </Typography>
                                    </Grid>

                                    {selectedDestination.driver.imgs?.length >
                                      0 && (
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                          color="primary.main"
                                          sx={{ mb: 1 }}
                                        >
                                          <strong>Hình ảnh</strong>
                                        </Typography>
                                        <ImageList
                                          cols={2}
                                          gap={8}
                                          sx={{
                                            mb: 1,
                                            "& .MuiImageListItem-root": {
                                              overflow: "hidden",
                                              borderRadius: 1,
                                            },
                                          }}
                                        >
                                          {selectedDestination.driver.imgs.map(
                                            (img, index) => (
                                              <ImageListItem
                                                key={index}
                                                sx={{
                                                  height: "120px !important",
                                                  "&:hover img": {
                                                    transform: "scale(1.1)",
                                                    transition:
                                                      "transform 0.3s ease-in-out",
                                                  },
                                                }}
                                              >
                                                <img
                                                  src={img}
                                                  alt={`Activity image ${
                                                    index + 1
                                                  }`}
                                                  loading="lazy"
                                                  style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition:
                                                      "transform 0.3s ease-in-out",
                                                  }}
                                                />
                                              </ImageListItem>
                                            )
                                          )}
                                        </ImageList>
                                      </Grid>
                                    )}
                                  </Grid>
                                </Box>
                              )}
                              {selectedDestination.accommodation && (
                                <Box sx={{ mb: 3 }}>
                                  <Grid container spacing={2}>
                                    {/* Left side - Text content */}
                                    <Grid item xs={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        color="primary.main"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Nơi ở</strong>
                                      </Typography>
                                      <Typography variant="body1" gutterBottom>
                                        <strong>
                                          {
                                            selectedDestination.accommodation
                                              .accommodationName
                                          }
                                        </strong>
                                        {selectedDestination.accommodation
                                          .star && (
                                          <Typography
                                            component="span"
                                            sx={{
                                              ml: 1,
                                              color: "warning.main",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            (
                                            {
                                              selectedDestination.accommodation
                                                .star
                                            }{" "}
                                            sao)
                                          </Typography>
                                        )}
                                      </Typography>
                                      <Typography variant="body1" gutterBottom>
                                        <strong>Địa chỉ:</strong>{" "}
                                        {
                                          selectedDestination.accommodation
                                            .address
                                        }
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        gutterBottom
                                        sx={{ mb: 2 }}
                                      >
                                        <strong>SĐT:</strong>{" "}
                                        {
                                          selectedDestination.accommodation
                                            .phoneNumber
                                        }
                                      </Typography>
                                    </Grid>

                                    {selectedDestination.accommodation.imgs
                                      ?.length > 0 && (
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                          color="primary.main"
                                          sx={{ mb: 1 }}
                                        >
                                          <strong>Hình ảnh</strong>
                                        </Typography>
                                        <ImageList
                                          cols={2}
                                          gap={8}
                                          sx={{
                                            mb: 1,
                                            "& .MuiImageListItem-root": {
                                              overflow: "hidden",
                                              borderRadius: 1,
                                            },
                                          }}
                                        >
                                          {selectedDestination.accommodation.imgs.map(
                                            (img, index) => (
                                              <ImageListItem
                                                key={index}
                                                sx={{
                                                  height: "120px !important",
                                                  "&:hover img": {
                                                    transform: "scale(1.1)",
                                                    transition:
                                                      "transform 0.3s ease-in-out",
                                                  },
                                                }}
                                              >
                                                <img
                                                  src={img}
                                                  alt={`Accommodation image ${
                                                    index + 1
                                                  }`}
                                                  loading="lazy"
                                                  style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition:
                                                      "transform 0.3s ease-in-out",
                                                  }}
                                                />
                                              </ImageListItem>
                                            )
                                          )}
                                        </ImageList>
                                      </Grid>
                                    )}
                                  </Grid>
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
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <TourBookingForm
              tourId={id}
              priceOfAdults={tour.priceOfAdults}
              priceOfChildren={tour.priceOfChildren}
              slot={tour.slot}
              people={tour.people}
            />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default BookTourPage;
