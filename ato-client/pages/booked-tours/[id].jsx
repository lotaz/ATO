import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Stack,
} from "@mui/material";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import useSWR from "swr";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { PaymentStatus, StatusBooking } from "constants/order-enums";
import { CardTravelOutlined } from "@mui/icons-material";
import { currency } from "lib";

const fetcher = (url) => get(url).then((res) => res.data);

const BookedTourDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: booking,
    error,
    isLoading,
  } = useSWR(id ? `/tourist/book-tour/get-book-tour/${id}` : null, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading booking details</div>;
  if (!booking) return <div>Booking not found</div>;

  // Status translations and colors
  const statusBookingTranslations = {
    [StatusBooking.Pending]: "Đang chờ xử lý",
    [StatusBooking.Confirmed]: "Đã xác nhận",
    [StatusBooking.Cancelled]: "Đã hủy",
    [StatusBooking.Completed]: "Hoàn thành",
  };

  const paymentStatusTranslations = {
    [PaymentStatus.Paid]: "Đã thanh toán",
    [PaymentStatus.UnPaid]: "Chưa thanh toán",
    [PaymentStatus.Failed]: "Thanh toán thất bại",
    [PaymentStatus.Refunded]: "Đã hoàn tiền",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case StatusBooking.Pending:
        return "warning";
      case StatusBooking.Confirmed:
        return "success";
      case StatusBooking.Cancelled:
        return "error";
      case StatusBooking.Completed:
        return "info";
      default:
        return "default";
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
  const calculateTotalAmount = () => {
    const tourAmount = booking.totalAmmount || 0;
    const productsAmount =
      booking.orders?.reduce((sum, order) => {
        return sum + (order.totalAmount || 0);
      }, 0) || 0;
    return (tourAmount + productsAmount).toLocaleString();
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        title="Chi tiết tour đã đặt"
        icon={CardTravelOutlined}
        navigation={<CustomerDashboardNavigation />}
      />

      <Card>
        <CardContent>
          {/* Booking Header */}
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="h5">
              {booking.agriculturalTourPackage?.packageName}
            </Typography>
            <Box>
              <>
                {statusBookingTranslations[booking.statusBooking] && (
                  <Chip
                    label={statusBookingTranslations[booking.statusBooking]}
                    color={getStatusColor(booking.statusBooking)}
                    sx={{ mr: 1 }}
                  />
                )}
              </>

              <Chip
                label={paymentStatusTranslations[booking.paymentStatus]}
                color={getPaymentStatusColor(booking.paymentStatus)}
              />
            </Box>
          </Box>

          {/* Booking Info */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Thông tin đặt tour
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Mã đặt tour"
                    secondary={booking.bookingId}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Ngày đặt"
                    secondary={new Date(
                      booking.bookingDate
                    ).toLocaleDateString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Số người"
                    secondary={booking.numberOfPeople}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Tổng tiền"
                    secondary={
                      <>
                        <Typography component="span" display="block">
                          Tour:{" "}
                          {(
                            booking.agriculturalTourPackage.price *
                            booking.numberOfPeople
                          ).toLocaleString()}{" "}
                          VNĐ
                        </Typography>
                        <Typography component="span" display="block">
                          Sản phẩm:{" "}
                          {(
                            booking.orders?.reduce(
                              (sum, order) => sum + (order.totalAmount || 0),
                              0
                            ) || 0
                          ).toLocaleString()}{" "}
                          VNĐ
                        </Typography>
                        <Typography
                          component="span"
                          display="block"
                          fontWeight="bold"
                        >
                          Tổng cộng: {booking.totalAmmount.toLocaleString()} VNĐ
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Thông tin thanh toán
              </Typography>
              {booking.vnPayPaymentResponses?.map((payment) => (
                <Card key={payment.responseId} sx={{ mb: 2 }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="body2">
                        Mã giao dịch: {payment.transactionNo}
                      </Typography>
                      <Typography variant="body2">
                        Ngày thanh toán:{" "}
                        {new Date(payment.payDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Số tiền: {payment.amount.toLocaleString()} VNĐ
                      </Typography>
                      <Typography variant="body2">
                        Trạng thái:{" "}
                        {paymentStatusTranslations[booking.paymentStatus]}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Order Details */}
          <Typography variant="h6" gutterBottom>
            Chi tiết đơn hàng
          </Typography>
          {booking.orders?.map((order) => (
            <Card key={order.orderId} sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="subtitle1">
                    Đơn hàng #{order.orderId.substring(0, 8)}
                  </Typography>
                  <Typography variant="body2">
                    Ngày tạo: {new Date(order.createDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <List>
                  {order.orderDetails?.map((detail, index) => (
                    <ListItem key={index}>
                      <Avatar
                        src={detail.product?.imgs?.[0] || "/placeholder.jpg"}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <ListItemText
                        primary={detail.product?.productName || "Tour"}
                        secondary={
                          <>
                            <Typography component="span" display="block">
                              Số lượng: {detail.quantity}
                            </Typography>
                            <Typography component="span" display="block">
                              Đơn giá: {detail.unitPrice.toLocaleString()} VNĐ
                            </Typography>
                            <Typography component="span" display="block">
                              Thành tiền:{" "}
                              {(
                                detail.unitPrice * detail.quantity
                              ).toLocaleString()}{" "}
                              VNĐ
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Typography variant="h6">
                    Tổng: {order.totalAmount.toLocaleString()} VNĐ
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}

          {/* Actions */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              sx={{ mr: 2 }}
            >
              Trở lại
            </Button>
            <Button
              variant="contained"
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
    </CustomerDashboardLayout>
  );
};

export default BookedTourDetailsPage;
