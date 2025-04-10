import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import { PaymentStatus, StatusBooking } from "constants/order-enums";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (url) => get(url).then((res) => res.data);
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { CardTravelOutlined } from "@mui/icons-material";

const BookedToursPage = () => {
  const router = useRouter();
  const {
    data: bookedTours,
    error,
    isLoading,
  } = useSWR("/tourist/book-tour/get-list-book-tours", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading booked tours</div>;
  if (!bookedTours) return <div>No booked tours found</div>;

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

  console.log("bookedTours", bookedTours);

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        title="Danh sách tour của tôi"
        icon={CardTravelOutlined}
        navigation={<CustomerDashboardNavigation />}
      />
      <Grid container spacing={3}>
        {bookedTours.map((booking) => (
          <Grid item xs={12} key={booking.bookingId}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">
                    {booking.agriculturalTourPackage?.packageName}
                  </Typography>
                  <Box>
                    {statusBookingTranslations[booking.statusBooking] && (
                      <Chip
                        label={statusBookingTranslations[booking.statusBooking]}
                        color={getStatusColor(booking.statusBooking)}
                        sx={{ mr: 1 }}
                      />
                    )}

                    <Chip
                      label={paymentStatusTranslations[booking.paymentStatus]}
                      color={getPaymentStatusColor(booking.paymentStatus)}
                    />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  Ngày đặt: {new Date(booking.bookingDate).toLocaleDateString()}
                </Typography>

                <Typography variant="body1" mb={2}>
                  Số người: {booking.numberOfPeople}
                </Typography>

                <Typography variant="h6" mb={2}>
                  Tổng tiền: {booking.totalAmmount} VNĐ
                </Typography>

                {booking.orders?.map((order) => (
                  <Box
                    key={order.orderId}
                    mt={2}
                    p={2}
                    sx={{ border: "1px solid #eee", borderRadius: 1 }}
                  >
                    <Typography variant="subtitle1">
                      Đơn hàng #{order.orderId.substring(0, 8)}
                    </Typography>
                    <Typography variant="body2">
                      Ngày tạo:{" "}
                      {new Date(order.createDate).toLocaleDateString()}
                    </Typography>

                    {order.orderDetails?.map((detail) => (
                      <Box
                        key={`${order.orderId}-${
                          detail.product?.productId || "tour"
                        }`}
                        mt={1}
                      >
                        <Typography variant="body2">
                          {detail.product?.productName || "Tour"} - Số lượng:{" "}
                          {detail.quantity} - Đơn giá:{" "}
                          {detail.unitPrice.toLocaleString()} VNĐ
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ))}

                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      router.push(`/booked-tours/${booking.bookingId}`)
                    }
                    sx={{ mr: 2 }}
                  >
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      router.push(`/tour-packages/${booking.tourId}`)
                    }
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
          </Grid>
        ))}
      </Grid>
    </CustomerDashboardLayout>
  );
};

export default BookedToursPage;
