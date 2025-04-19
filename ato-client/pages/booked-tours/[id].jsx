import { CardTravelOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { PaymentStatus, StatusBooking } from "constants/order-enums";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import useSWR from "swr";

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
              <strong>{booking.agriculturalTourPackage?.packageName}</strong>
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
                          {new Date(booking.bookingDate).toLocaleDateString(
                            "vi-VN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </Typography>
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
                            <strong>Chuyến du lịch: </strong>
                            {(
                              booking.agriculturalTourPackage.priceOfAdults *
                                booking.numberOfAdults +
                              booking.numberOfChildren *
                                booking.agriculturalTourPackage.priceOfChildren
                            ).toLocaleString()}{" "}
                            VNĐ
                          </Typography>
                          <Typography variant="body1" color="error.main">
                            <Typography variant="h6" color="error.main">
                              <strong>
                                Tổng cộng:{" "}
                                {booking.totalAmmount.toLocaleString()} VNĐ
                              </strong>
                            </Typography>
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
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
                  Thông tin thanh toán
                </Typography>
                {booking.vnPayPaymentResponses?.length > 0 ? (
                  booking.vnPayPaymentResponses.map((payment) => (
                    <Card
                      key={payment.responseId}
                      sx={{
                        mb: 2,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        border: "1px solid #eee",
                      }}
                    >
                      <CardContent>
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
                              {new Date(payment.payDate).toLocaleString(
                                "vi-VN",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
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
                              color={getPaymentStatusColor(
                                booking.paymentStatus
                              )}
                              size="small"
                            />
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Alert severity="info">Chưa có thông tin thanh toán</Alert>
                )}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Order Details */}
          {/* <Typography variant="h6" gutterBottom>
            <strong>Chi tiết đơn hàng</strong>
          </Typography>
          {booking.orders?.map((order) => (
            <Card key={order.orderId} sx={{ 
              mb: 3,
              bgcolor: '#f8f9fa',
              border: '1px solid #e0e0e0',
              boxShadow: 'none'
            }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Mã đơn hàng:  #{order.orderId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ngày tạo: {new Date(order.createDate).toLocaleDateString('vi-VN')}
                  </Typography>
                </Box>

                <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                  {order.orderDetails?.map((detail, index) => (
                    <ListItem key={index} sx={{ 
                      mb: 1, 
                      bgcolor: 'white',
                      borderRadius: 1,
                      border: '1px solid #eee'
                    }}>
                      <Avatar
                        src={detail.product?.imgs?.[0] || "/placeholder.jpg"}
                        sx={{ width: 64, height: 64, mr: 2 }}
                        variant="rounded"
                      />
                      <ListItemText
                        primary={
                          <Typography fontWeight="medium">
                            {detail.product?.productName || "Tour"}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  <strong>Số lượng:</strong> {detail.quantity}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                
                              </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={9}>
                              <Typography variant="body2" color="text.secondary">
                                  <strong>Đơn giá:</strong> {detail.unitPrice.toLocaleString()} VNĐ
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="body2" color="primary.main" fontWeight="medium" sx={{ mt: 1 }}>
                                  <strong>Thành tiền: {(detail.unitPrice * detail.quantity).toLocaleString()} VNĐ</strong> 
                                </Typography> 
                              </Grid>
                            </Grid>

                            
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Box 
                  display="flex" 
                  justifyContent="flex-end" 
                  mt={2} 
                  p={2} 
                  bgcolor="white"
                  borderRadius={1}
                >
                  <Typography variant="h6" color="error.main">
                    <strong>Tổng: {order.totalAmount.toLocaleString()} VNĐ</strong> 
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))} */}

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
