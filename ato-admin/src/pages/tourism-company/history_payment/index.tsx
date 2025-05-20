import { CloseOutlined } from '@ant-design/icons';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { bookTourService, TourBooking } from '../../../services/tourism-company/book-tour.service';
import { paymentService, VNPayPaymentResponse } from '../../../services/tourism-company/history_payment';

enum TimeType {
  Hour = 0,
  Day = 1
}

export enum StatusActive {
  Active = 1,
  Inactive = 0
}
//hehe

const TourPaymentHistory = () => {
  const [payments, setPayments] = useState<VNPayPaymentResponse[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<VNPayPaymentResponse | null>(null);
  const [bookingDetails, setBookingDetails] = useState<TourBooking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await paymentService.getPaymentHistory();
        setPayments(response.data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const fetchBookingDetails = async (bookingId: string) => {
    try {
      const response = await bookTourService.getBookingsByBookingId(bookingId);
      if (response.data && response.data.length > 0) {
        setBookingDetails(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch booking details:', error);
    }
  };

  const handlePaymentClick = (payment: VNPayPaymentResponse) => {
    setSelectedPayment(payment);
    setBookingDetails(null);
    if (payment.bookingAgriculturalTour?.bookingId) {
      fetchBookingDetails(payment.bookingAgriculturalTour.bookingId);
    }
  };

  const handleCloseDialog = () => {
    setSelectedPayment(null);
    setBookingDetails(null);
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case '00':
        return 'Thành công';
      default:
        return 'Thất bại';
    }
  };

  const getBookingStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Chưa hoàn thành đơn';
      case 1:
        return 'Đã xác nhận';
      case 2:
        return 'Hoàn thành';
      case 3:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getBookingStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return 'warning';
      case 1:
        return 'info';
      case 2:
        return 'success';
      case 3:
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDateTime = (date: string | undefined | null) => {
    return date;
  };

  const formatCurrency = (amount: number | undefined | null) => {
    return amount ? `${new Intl.NumberFormat('vi-VN').format(amount)} VNĐ` : 'N/A';
  };

  return (
    <Paper sx={{ p: 2 }}>
      {payments.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            textAlign: 'center',
            p: 4
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Không tìm thấy lịch sử thanh toán
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Hiện tại không có giao dịch nào được ghi nhận
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã giao dịch</TableCell>
                <TableCell>Tên tour</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Số tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.responseId} hover onClick={() => handlePaymentClick(payment)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{payment.txnRef}</TableCell>
                  <TableCell>{payment.bookingAgriculturalTour?.agriculturalTourPackage?.packageName || 'N/A'}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={payment.bookingAgriculturalTour?.customer?.avatarURL} />
                      {payment.bookingAgriculturalTour?.customer?.fullname || 'N/A'}
                    </Stack>
                  </TableCell>
                  <TableCell>{payment.bookingAgriculturalTour?.customer?.email || 'N/A'}</TableCell>
                  <TableCell>{formatDateTime(payment.payDate)}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>
                    <Chip
                      label={getPaymentStatusText(payment.responseCode)}
                      color={payment.responseCode === '00' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={Boolean(selectedPayment)} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedPayment && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Chi tiết giao dịch</Typography>
                <IconButton onClick={handleCloseDialog} size="small">
                  <CloseOutlined />
                </IconButton>
              </Stack>
            </DialogTitle>

            <DialogContent>
              <Stack spacing={3}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                      <strong>Thông tin khách hàng</strong>
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Avatar src={selectedPayment.bookingAgriculturalTour?.customer?.avatarURL} sx={{ width: 64, height: 64 }} />
                          <Typography variant="h6">{selectedPayment.bookingAgriculturalTour?.customer?.fullname || 'N/A'}</Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Email:</strong> {selectedPayment.bookingAgriculturalTour?.customer?.email || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Tên đăng nhập:</strong> {selectedPayment.bookingAgriculturalTour?.customer?.userName || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Giới tính:</strong>{' '}
                          {selectedPayment.bookingAgriculturalTour?.customer?.gender !== undefined
                            ? selectedPayment.bookingAgriculturalTour.customer.gender
                              ? 'Nam'
                              : 'Nữ'
                            : 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Ngày sinh:</strong> {selectedPayment.bookingAgriculturalTour?.customer?.dob}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Trạng thái tài khoản:</strong>{' '}
                          <Chip
                            label={
                              selectedPayment.bookingAgriculturalTour?.customer?.isAccountActive !== undefined
                                ? selectedPayment.bookingAgriculturalTour.customer.isAccountActive
                                  ? 'Đang hoạt động'
                                  : 'Đã khóa'
                                : 'N/A'
                            }
                            color={
                              selectedPayment.bookingAgriculturalTour?.customer?.isAccountActive !== undefined
                                ? selectedPayment.bookingAgriculturalTour.customer.isAccountActive
                                  ? 'success'
                                  : 'error'
                                : 'default'
                            }
                            size="small"
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                      <strong>Thông tin tour</strong>
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6">{bookingDetails?.agriculturalTourPackage?.packageName || 'N/A'}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {bookingDetails?.agriculturalTourPackage?.description || 'N/A'}
                        </Typography>
                        {bookingDetails?.agriculturalTourPackage?.imgs && (
                          <ImageList cols={3} rowHeight={200} sx={{ mb: 2 }}>
                            {bookingDetails.agriculturalTourPackage.imgs.map((image, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={image}
                                  alt={`Tour image ${index + 1}`}
                                  loading="lazy"
                                  style={{ height: '100%', objectFit: 'cover' }}
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        )}
                        <Divider sx={{ my: 2 }} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Mã tour:</strong> {bookingDetails?.agriculturalTourPackage?.tourId || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Thời gian bắt đầu:</strong> {formatDateTime(bookingDetails?.agriculturalTourPackage?.startTime)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Thời gian kết thúc:</strong> {formatDateTime(bookingDetails?.agriculturalTourPackage?.endTime)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Thời gian tạo:</strong> {formatDateTime(bookingDetails?.agriculturalTourPackage?.createDate)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Cập nhật lần cuối:</strong> {formatDateTime(bookingDetails?.agriculturalTourPackage?.updateDate)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Thời gian:</strong>{' '}
                          {bookingDetails?.agriculturalTourPackage?.durations
                            ? `${bookingDetails.agriculturalTourPackage.durations} ${
                                bookingDetails.agriculturalTourPackage.durationsType === TimeType.Day ? 'Ngày' : 'Giờ'
                              }`
                            : 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Số chỗ:</strong> {bookingDetails?.agriculturalTourPackage?.slot ?? 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Trạng thái:</strong>{' '}
                          <Chip
                            label={
                              bookingDetails?.agriculturalTourPackage?.statusActive === StatusActive.Active
                                ? 'Đang hoạt động'
                                : 'Không hoạt động'
                            }
                            color={bookingDetails?.agriculturalTourPackage?.statusActive === StatusActive.Active ? 'success' : 'error'}
                            size="small"
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Giá người lớn:</strong> {formatCurrency(bookingDetails?.agriculturalTourPackage?.priceOfAdults)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Giá trẻ em:</strong> {formatCurrency(bookingDetails?.agriculturalTourPackage?.priceOfChildren)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Độ tuổi trẻ em:</strong> {bookingDetails?.agriculturalTourPackage?.childTicketAge || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Số người lớn đã đặt:</strong> {bookingDetails?.numberOfAdults ?? 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Số trẻ em đã đặt:</strong> {bookingDetails?.numberOfChildren ?? 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Tổng tiền:</strong> {formatCurrency(bookingDetails?.totalAmmount)}
                        </Typography>
                      </Grid>
                      {(bookingDetails?.agriculturalTourPackage?.tourDestinations?.length ?? 0) > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Điểm đến:</strong>
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {bookingDetails?.agriculturalTourPackage?.tourDestinations?.map((destination, index) => (
                              <Chip key={index} label={destination.name} size="small" />
                            ))}
                          </Stack>
                        </Grid>
                      )}
                      {(bookingDetails?.agriculturalTourPackage?.tourGuides?.length ?? 0) > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Hướng dẫn viên:</strong>
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {bookingDetails?.agriculturalTourPackage?.tourGuides?.map((guide, index) => (
                              <Chip key={index} label={guide.name} size="small" />
                            ))}
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                      <strong>Thông tin thanh toán</strong>
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Mã giao dịch:</strong> {selectedPayment.txnRef || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Mã đơn hàng:</strong> {selectedPayment.orderId || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Ngân hàng:</strong> {selectedPayment.bankCode || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Loại thẻ:</strong> {selectedPayment.cardType || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Số tiền:</strong> {formatCurrency(selectedPayment.amount)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Thời gian:</strong> {selectedPayment.payDate}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Trạng thái:</strong>{' '}
                          <Chip
                            label={getPaymentStatusText(selectedPayment.responseCode)}
                            color={selectedPayment.responseCode === '00' ? 'success' : 'error'}
                            size="small"
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Paper>
  );
};

export default TourPaymentHistory;
