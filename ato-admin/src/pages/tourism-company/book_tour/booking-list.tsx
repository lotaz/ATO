import { ArrowDownOutlined, ArrowUpOutlined, CloseOutlined, ExpandOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
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
import { TextField } from '@mui/material';

const BookingList = () => {
  const getPaymentStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Đã thanh toán';
      case 1:
        return 'Chưa thanh toán';
      default:
        return 'Không xác định';
    }
  };

  const getBookingStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Chờ xác nhận';
      case 1:
        return 'Đã xác nhận';
      default:
        return 'Không xác định';
    }
  };

  const [bookings, setBookings] = useState<TourBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<TourBooking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookTourService.getBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  const calculatePriceBreakdown = (booking: TourBooking) => {
    const adultTotal = booking.numberOfAdults * booking.agriculturalTourPackage.priceOfAdults;
    const childTotal = booking.numberOfChildren * booking.agriculturalTourPackage.priceOfChildren;
    return { adultTotal, childTotal, total: adultTotal + childTotal };
  };
  // Group bookings by tour ID
  const groupedBookings = bookings.reduce((acc, booking) => {
    const tourId = booking.agriculturalTourPackage.tourId;
    if (!acc[tourId]) {
      acc[tourId] = {
        packageName: booking.agriculturalTourPackage.packageName,
        bookings: []
      };
    }
    acc[tourId].bookings.push(booking);
    return acc;
  }, {});

  const [expandedTours, setExpandedTours] = useState({});

  const toggleTour = (tourId) => {
    setExpandedTours((prev) => ({
      ...prev,
      [tourId]: !prev[tourId]
    }));
  };

  const [searchTerm, setSearchTerm] = useState('');

  // Filter function
  const filteredGroupedBookings = Object.entries(groupedBookings).filter(([_, tourGroup]) =>
    tourGroup.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm theo tên tour"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
        />
      </Stack>

      {filteredGroupedBookings.map(([tourId, tourGroup]) => (
        <Card key={tourId} sx={{ mb: 2, boxShadow: 3 }} onClick={() => toggleTour(tourId)}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={tourGroup.bookings[0]?.agriculturalTourPackage?.imgs[0]} sx={{ width: 56, height: 56 }} variant="rounded" />
                <Stack>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {tourGroup.packageName}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {tourGroup.bookings.length} hóa đơn đặt
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Intl.NumberFormat('vi-VN').format(
                        tourGroup.bookings.reduce((sum, booking) => sum + calculatePriceBreakdown(booking).total, 0)
                      )}{' '}
                      VNĐ
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <IconButton sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                {expandedTours[tourId] ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              </IconButton>
            </Stack>

            {expandedTours[tourId] && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã đặt tour</TableCell>
                      <TableCell>Ngày đặt</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Tổng tiền</TableCell>
                      <TableCell>Trạng thái thanh toán</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tourGroup.bookings.map((booking) => (
                      <TableRow key={booking.bookingId} hover onClick={() => setSelectedBooking(booking)} sx={{ cursor: 'pointer' }}>
                        <TableCell>{booking.bookingId}</TableCell>
                        <TableCell>{new Date(booking.bookingDate).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Chip label={`${booking.numberOfAdults} người lớn`} size="small" />
                            {booking.numberOfChildren > 0 && (
                              <Chip label={`${booking.numberOfChildren} trẻ em`} size="small" variant="outlined" />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>{new Intl.NumberFormat('vi-VN').format(calculatePriceBreakdown(booking).total)} VNĐ</TableCell>
                        <TableCell>
                          <Chip
                            label={getPaymentStatusText(booking.paymentStatus)}
                            color={booking.paymentStatus === 0 ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      ))}

      {filteredGroupedBookings.length === 0 && <Typography>Không tìm thấy dữ liệu</Typography>}

      <Dialog open={Boolean(selectedBooking)} onClose={() => setSelectedBooking(null)} maxWidth="md" fullWidth>
        {selectedBooking && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Chi tiết đặt tour</Typography>
                <IconButton onClick={() => setSelectedBooking(null)} size="small">
                  <CloseOutlined />
                </IconButton>
              </Stack>
            </DialogTitle>

            <DialogContent>
              <Stack spacing={3}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                      <strong>{selectedBooking.agriculturalTourPackage.packageName}</strong>
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          {selectedBooking.agriculturalTourPackage.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>Thời gian bắt đầu:</strong>{' '}
                          {new Date(selectedBooking.agriculturalTourPackage.startTime).toLocaleString('vi-VN')}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Thời gian kết thúc:</strong>{' '}
                          {new Date(selectedBooking.agriculturalTourPackage.endTime).toLocaleString('vi-VN')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>Giá người lớn:</strong>{' '}
                          {new Intl.NumberFormat('vi-VN').format(selectedBooking.agriculturalTourPackage.priceOfAdults)} VNĐ
                        </Typography>
                        <Typography variant="body2">
                          <strong>Giá trẻ em:</strong>{' '}
                          {new Intl.NumberFormat('vi-VN').format(selectedBooking.agriculturalTourPackage.priceOfChildren)} VNĐ
                        </Typography>
                      </Grid>
                      {selectedBooking.agriculturalTourPackage.imgs.length > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" gutterBottom>
                            Hình ảnh tour:
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
                            {selectedBooking.agriculturalTourPackage.imgs.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Tour image ${index + 1}`}
                                style={{ height: 200, width: 'auto', borderRadius: 8 }}
                              />
                            ))}
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        <strong> Thông tin đặt chỗ</strong>
                      </Typography>
                      <Divider />
                      <Typography variant="body2">
                        <strong>Ngày đặt:</strong> {new Date(selectedBooking.bookingDate).toLocaleString('vi-VN')}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Tiền vé người lớn:</strong>{' '}
                        {new Intl.NumberFormat('vi-VN').format(calculatePriceBreakdown(selectedBooking).adultTotal)} VNĐ (
                        {selectedBooking.numberOfAdults} x{' '}
                        {new Intl.NumberFormat('vi-VN').format(selectedBooking.agriculturalTourPackage.priceOfAdults)} VNĐ)
                      </Typography>
                      <Typography variant="body2">
                        <strong>Tiền vé trẻ em:</strong>{' '}
                        {new Intl.NumberFormat('vi-VN').format(calculatePriceBreakdown(selectedBooking).childTotal)} VNĐ (
                        {selectedBooking.numberOfChildren} x{' '}
                        {new Intl.NumberFormat('vi-VN').format(selectedBooking.agriculturalTourPackage.priceOfChildren)} VNĐ)
                      </Typography>
                      <Divider />
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                        <strong>Tổng tiền:</strong> {new Intl.NumberFormat('vi-VN').format(calculatePriceBreakdown(selectedBooking).total)}{' '}
                        VNĐ
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={getPaymentStatusText(selectedBooking.paymentStatus)}
                          color={selectedBooking.paymentStatus === 0 ? 'success' : 'warning'}
                          size="small"
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                {selectedBooking.vnPayPaymentResponses.length > 0 && (
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        <strong> Thông tin thanh toán</strong>
                      </Typography>
                      {selectedBooking.vnPayPaymentResponses.map((payment) => (
                        <Stack key={payment.responseId} spacing={1}>
                          <Typography variant="body2">
                            <strong>Mã giao dịch:</strong> {payment.txnRef}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Ngân hàng:</strong> {payment.bankCode}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Phương thức:</strong> {payment.cardType}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Thời gian:</strong> {new Date(payment.payDate).toLocaleString('vi-VN')}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Số tiền:</strong> {new Intl.NumberFormat('vi-VN').format(payment.amount)} VNĐ (Đã bao gồm thanh toán sản
                            phẩm)
                          </Typography>
                        </Stack>
                      ))}
                    </CardContent>
                  </Card>
                )}
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                      <strong>Thông tin khách hàng</strong>
                    </Typography>
                    <Stack spacing={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2">
                            <strong>Họ và tên:</strong> {selectedBooking.customer.fullname || 'Chưa cập nhật'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Email:</strong> {selectedBooking.customer.email}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Số điện thoại:</strong> {selectedBooking.customer.phoneNumber || 'Chưa cập nhật'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2">
                            <strong>Trạng thái tài khoản:</strong>{' '}
                            {selectedBooking.customer.isAccountActive ? 'Đang hoạt động' : 'Không hoạt động'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Giới tính:</strong> {selectedBooking.customer.gender || 'Chưa cập nhật'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Ngày sinh:</strong>{' '}
                            {selectedBooking.customer.dob
                              ? new Date(selectedBooking.customer.dob).toLocaleDateString('vi-VN')
                              : 'Chưa cập nhật'}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="body2">
                          <strong>Trạng thái đặt tour:</strong>
                        </Typography>
                        <Chip
                          label={getBookingStatusText(selectedBooking.statusBooking)}
                          color={selectedBooking.statusBooking === 1 ? 'success' : 'warning'}
                          size="small"
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default BookingList;
