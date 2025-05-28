import {
  CalendarMonthOutlined,
  CardTravelOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import {
  TabContext,
  TabList,
  TabPanel,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { PaymentStatus, StatusBooking } from "constants/order-enums";
import dayjs from "dayjs";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { useSnackbar } from "notistack";
import { ConfirmDialog } from "components/ConfirmDialog";
const fetcher = (url) => get(url).then((res) => res.data);
import { post } from "helpers/axios-helper";
import HtmlParagraph from "components/HtmlParagraph";
export const BookingDestinationStatus = {
  Pending: 0,
  InProgress: 1,
  Completed: 2,
  Canceled: 3,
  Skipped: 4,
};
const BookedTourDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tabValue, setTabValue] = useState("1");
  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: booking,
    error,
    isLoading,
  } = useSWR(id ? `/tourist/book-tour/get-book-tour/${id}` : null, fetcher);

  const {
    data: tourInfo,
    error: tourInfoError,
    isLoading: isTourInfoLoading,
  } = useSWR(
    booking?.agriculturalTourPackage?.tourId
      ? `/general/${booking.agriculturalTourPackage.tourId}`
      : null,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading booking details</div>;
  if (!booking) return <div>Booking not found</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 0: // Added Processing case
        return "warning";
      case 1:
        return "primary";
      case 2:
        return "error";
      case 4:
        return "info";

      default:
        return "default";
    }
  };

  const statusBookingTranslations = {
    [StatusBooking.Processing]: "Đang xử lý", // Updated label for Processing
    [StatusBooking.Completed]: "Hoàn thành",
    [StatusBooking.Canceled]: "Đã hủy", // Assuming Canceled maps to Canceled
    [StatusBooking.ConfirmBooking]: "Đã xác nhận", // Updated label for ConfirmBooking
    [StatusBooking.InProgress]: "Đang thực hiện", // Added label for InProgress
  };

  const paymentStatusTranslations = {
    [PaymentStatus.Paid]: "Đã thanh toán",
    [PaymentStatus.UnPaid]: "Chưa thanh toán",
    [PaymentStatus.Failed]: "Thanh toán thất bại",
    [PaymentStatus.Refunded]: "Đã hoàn tiền",
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusTrackingColor = (status) => {
    switch (status) {
      case BookingDestinationStatus.Pending:
        return "info";
      case BookingDestinationStatus.InProgress:
        return "info";
      case BookingDestinationStatus.Completed:
        return "success";
      case BookingDestinationStatus.Canceled:
        return "error";
      case BookingDestinationStatus.Skipped:
        return "text";
      default:
        return "warning";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case PaymentStatus.Paid:
        return "success";
      case PaymentStatus.UnPaid:
        return "warning";
      case PaymentStatus.Failed:
        return "error";
      case PaymentStatus.Refunded:
        return "info";
      default:
        return "default";
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case BookingDestinationStatus.Pending:
        return "Chưa bắt đầu";
      case BookingDestinationStatus.InProgress:
        return "Đang thực hiện";
      case BookingDestinationStatus.Completed:
        return "Hoàn thành";
      case BookingDestinationStatus.Canceled:
        return "Đã hủy";
      case BookingDestinationStatus.Skipped:
        return "Đã bỏ qua";
      default:
        return "Chưa bắt đầu";
    }
  };
  const handleCancelTour = async () => {
    try {
      await post(`/tourist/book-tour/cancel/${id}`);
      enqueueSnackbar("Hủy tour thành công", { variant: "success" });
      router.push("/booked-tours");
    } catch (error) {
      enqueueSnackbar("Hủy tour thất bại", { variant: "error" });
    }
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        title="Chi tiết tour đã đặt"
        icon={CardTravelOutlined}
        navigation={<CustomerDashboardNavigation />}
      />
      {/* Booking Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h6">
          <strong>{booking.agriculturalTourPackage?.packageName}</strong>
        </Typography>
        <Box>
          {statusBookingTranslations[booking.statusBooking] && (
            <Chip
              label={statusBookingTranslations[booking.statusBooking]}
              color={getStatusColor(booking.statusBooking)}
              sx={{ mr: 1, color: "white" }}
            />
          )}

          {booking.statusBooking === 1 && (
            <Chip
              sx={{ color: "white" }}
              label={paymentStatusTranslations[booking.paymentStatus]}
              color={"success"}
            />
          )}
          {booking.statusBooking === 2 && (
            <Chip
              sx={{ color: "white" }}
              label={"Đã hoàn tiền"}
              color={"success"}
            />
          )}
        </Box>
      </Box>
      <Card>
        <CardContent>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <TabList
                onChange={handleTabChange}
                aria-label="Tour details tabs"
              >
                <Tab label="Thông tin đặt chuyến" value="1" />
                <Tab label="Thanh toán" value="2" />
                <Tab label="Lịch trình" value="3" />
                <Tab label="Hướng dẫn viên" value="4" />
              </TabList>
            </Box>

            <TabPanel value="1" sx={{ p: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: "#f8f9fa",
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#f8f9fa",
                        p: 3,
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        color="primary.main"
                        fontWeight="bold"
                      >
                        Thông tin đặt chuyến
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography color="text.secondary">
                                <strong>Công ty du lịch: </strong>
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body1">
                                {tourInfo?.tourCompany?.name}
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemText
                            primary={
                              <Typography color="text.secondary">
                                <strong>Mã đặt chuyến: </strong>
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body1" fontWeight="medium">
                                {booking.bookingId}
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography color="text.secondary">
                                <strong>Ngày đặt : </strong>
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body1">
                                {new Date(
                                  booking.bookingDate
                                ).toLocaleDateString("vi-VN", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography color="text.secondary">
                                <strong>Điểm hẹn: </strong>
                              </Typography>
                            }
                            secondary={
                              <HtmlParagraph>
                                {tourInfo?.location}
                              </HtmlParagraph>
                            }
                          />
                        </ListItem>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemText
                            primary={
                              <Typography color="text.secondary">
                                <strong>Số người lớn : </strong>
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body1">
                                {booking.numberOfAdults} người
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemText
                            primary={
                              <Typography color="text.secondary">
                                <strong>Số trẻ em : </strong>
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body1">
                                {booking.numberOfChildren} người
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemText
                            primary={
                              <Typography color="text.secondary">
                                <strong>Chi tiết thanh toán </strong>
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Typography
                                  variant="body1"
                                  sx={{ mb: 1 }}
                                  fontWeight="bold"
                                >
                                  <strong>
                                    {booking.numberOfAdults} người lớn:{" "}
                                  </strong>
                                  {(
                                    booking.agriculturalTourPackage
                                      .priceOfAdults * booking.numberOfAdults
                                  ).toLocaleString()}{" "}
                                  VNĐ
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{ mb: 1 }}
                                  fontWeight="bold"
                                >
                                  <strong>
                                    {booking.numberOfChildren} trẻ em:{" "}
                                  </strong>
                                  {(
                                    booking.numberOfChildren *
                                    booking.agriculturalTourPackage
                                      .priceOfChildren
                                  ).toLocaleString()}{" "}
                                  VNĐ
                                </Typography>
                                <Typography variant="body1" color="error.main">
                                  <Typography variant="h6" color="error.main">
                                    <strong>
                                      Tổng cộng:{" "}
                                      {booking.totalAmmount.toLocaleString()}{" "}
                                      VNĐ
                                    </strong>
                                  </Typography>
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Booking Info */}
            <TabPanel value="2" sx={{ p: 0 }}>
              <Box
                sx={{
                  bgcolor: "#f8f9fa",
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#f8f9fa",

                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary.main"
                    fontWeight="bold"
                  >
                    Thông tin thanh toán
                  </Typography>
                  {booking.vnPayPaymentResponses?.length > 0 ? (
                    booking.vnPayPaymentResponses.map((payment) => (
                      <Stack spacing={1.5}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography color="text.secondary">
                            <strong>Mã giao dịch: </strong>
                          </Typography>
                          <Typography fontWeight="medium">
                            {payment.transactionNo}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography color="text.secondary">
                            <strong>Ngày thanh toán: </strong>
                          </Typography>
                          <Typography>
                            {new Date(payment.payDate).toLocaleString("vi-VN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography color="text.secondary">
                            <strong>Số tiền: </strong>
                          </Typography>
                          <Typography color="error.main" fontWeight="bold">
                            {payment.amount.toLocaleString()} VNĐ
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography color="text.secondary">
                            <strong>Trạng thái: </strong>
                          </Typography>
                          <Chip
                            label={
                              paymentStatusTranslations[booking.paymentStatus]
                            }
                            color={getPaymentStatusColor(booking.paymentStatus)}
                            size="small"
                          />
                        </Box>
                      </Stack>
                    ))
                  ) : (
                    <Alert severity="info">Chưa có thông tin thanh toán</Alert>
                  )}
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="3" sx={{ p: 0 }}>
              <Box
                sx={{
                  bgcolor: "#f8f9fa",
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary.main"
                  fontWeight="bold"
                >
                  Lịch trình
                </Typography>
                {booking.agriculturalTourPackage?.tourDestinations?.length >
                0 ? (
                  <Timeline position="alternate">
                    {booking.agriculturalTourPackage?.tourDestinations?.map(
                      (destination, index) => {
                        const tracking = booking.trackings?.find(
                          (x) =>
                            x.tourDestinationId ===
                            destination.tourDestinationId
                        );

                        return (
                          <TimelineItem key={index}>
                            <TimelineSeparator>
                              <TimelineDot sx={{ bgcolor: "primary.main" }}>
                                {destination.typeActivity === 0 ? (
                                  <CalendarMonthOutlined />
                                ) : destination.typeActivity === 1 ? (
                                  <CalendarMonthOutlined />
                                ) : (
                                  <HomeOutlined />
                                )}
                              </TimelineDot>
                              {index !==
                                booking.agriculturalTourPackage.tourDestinations
                                  .length -
                                  1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                              <Card variant="outlined" sx={{ mb: 2 }}>
                                <CardContent>
                                  <Stack
                                    direction={"row"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                  >
                                    <Typography
                                      variant="h6"
                                      color="primary"
                                      gutterBottom
                                    >
                                      {destination.title}
                                    </Typography>
                                    {tracking && (
                                      <Chip
                                        label={getStatusMessage(
                                          tracking.status
                                        )}
                                        color={getStatusTrackingColor(
                                          tracking.status
                                        )}
                                      />
                                    )}

                                    {!tracking && (
                                      <Chip
                                        label={"Chưa bắt đầu"}
                                        color="warning"
                                      />
                                    )}
                                  </Stack>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mb: 2,
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      Thứ tự: {destination.visitOrder}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      •
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {destination.typeActivity === 0
                                        ? "Hoạt động"
                                        : destination.typeActivity === 1
                                        ? "Di chuyển"
                                        : "Lưu trú"}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                  >
                                    {destination.description}
                                  </Typography>
                                  <Box
                                    sx={{
                                      bgcolor: "background.default",
                                      p: 2,
                                      borderRadius: 1,
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        Thời gian bắt đầu dự kiến
                                      </Typography>
                                      <Typography variant="body2">
                                        {dayjs(destination.startTime).format(
                                          "DD/MM/YYYY HH:mm"
                                        )}
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        Thời gian kết thúc dự kiến
                                      </Typography>
                                      <Typography variant="body2">
                                        {dayjs(destination.endTime).format(
                                          "DD/MM/YYYY HH:mm"
                                        )}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </TimelineContent>
                          </TimelineItem>
                        );
                      }
                    )}
                  </Timeline>
                ) : (
                  <Alert severity="info">Chưa có thông tin lịch trình</Alert>
                )}
              </Box>
            </TabPanel>
            <TabPanel value="4" sx={{ p: 0 }}>
              <Box
                sx={{
                  bgcolor: "#f8f9fa",
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary.main"
                  fontWeight="bold"
                >
                  Danh sách hướng dẫn viên
                </Typography>
                {tourInfo?.tourGuides?.length > 0 ? (
                  <List>
                    {tourInfo.tourGuides.map((guide, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="bold">
                              {guide.name}
                            </Typography>
                          }
                          secondary={
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                Số điện thoại: {guide.phone || "Chưa cập nhật"}
                              </Typography>
                              <Typography variant="body2">
                                Email: {guide.email || "Chưa cập nhật"}
                              </Typography>
                            </Stack>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Alert severity="info">
                    Chưa có thông tin hướng dẫn viên
                  </Alert>
                )}
              </Box>
            </TabPanel>
          </TabContext>

          {/* Actions */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              sx={{ mr: 2 }}
            >
              Trở lại
            </Button>

            {booking.statusBooking !== 2 && booking.statusBooking !== 1 && (
              <Button
                variant="contained"
                onClick={() => setOpenConfirm(true)}
                color="error"
                sx={{ mr: 2 }}
              >
                Hủy tour
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(`/tour-packages/${booking.tourId}`)}
              sx={{ mr: 2 }}
            >
              Xem tour
            </Button>
            {booking.paymentStatus === PaymentStatus.UnPaid && (
              <Button variant="contained" color="error">
                Thanh toán lại
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleCancelTour}
        title="Xác nhận hủy tour"
        message="Bạn có chắc chắn muốn hủy tour này?"
        confirmText="Đồng ý"
        cancelText="Hủy bỏ"
      />
    </CustomerDashboardLayout>
  );
};

export default BookedTourDetailsPage;
