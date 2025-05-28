import { ArrowDownOutlined, ArrowUpOutlined, CiCircleFilled, ClockCircleOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { bookTourService, TourBooking } from '../../../services/tourism-company/book-tour.service';
import { useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';

// Define the StatusBooking enum to match the backend
export enum StatusBooking {
  Processing = 0,
  Completed = 1,
  Canceled = 2,
  ConfirmBooking = 3,
  InProgress = 4
}

export type TourStatus = {
  tourId: string;
  statusBooking: number;
};

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
      case StatusBooking.Processing:
        return 'Chờ xác nhận';
      case StatusBooking.Completed:
        return 'Đã hoàn thành';
      case StatusBooking.InProgress:
        return 'Đang diễn ra';
      case StatusBooking.Canceled:
        return 'Đã hủy';
      case StatusBooking.ConfirmBooking:
        return 'Đã xác nhận đủ khách';
      default:
        return 'Không xác định';
    }
  };

  const getBookingStatusColor = (status: number) => {
    switch (status) {
      case StatusBooking.Processing:
        return 'warning';
      case StatusBooking.Completed:
        return 'success';
      case StatusBooking.Canceled:
        return 'error';
      case StatusBooking.ConfirmBooking:
        return 'info';
      default:
        return 'default';
    }
  };
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<TourBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<TourBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [batchUpdateOpen, setBatchUpdateOpen] = useState(false);
  const [batchStatus, setBatchStatus] = useState<StatusBooking | null>(null);
  const [updatingBatch, setUpdatingBatch] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookTourService.getBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      enqueueSnackbar('Không thể tải danh sách đặt tour', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const calculatePriceBreakdown = (booking: TourBooking) => {
    const adultTotal = booking.numberOfAdults * booking.agriculturalTourPackage.priceOfAdults;
    const childTotal = booking.numberOfChildren * booking.agriculturalTourPackage.priceOfChildren;
    return { adultTotal, childTotal, total: adultTotal + childTotal };
  };
  // Group bookings by tour ID
  const groupedBookings = bookings.reduce((acc, booking) => {
    const groupId = booking.groupId;
    if (!acc[groupId]) {
      acc[groupId] = {
        packageName: booking.agriculturalTourPackage.packageName,
        groupId: booking.groupId,
        totalBookedPeople: booking.totalBookedPeople,
        slot: booking.agriculturalTourPackage.slot,
        bookings: []
      };
    }
    acc[groupId].bookings.push(booking);
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  const handleBatchUpdateStatus = async () => {
    try {
      setUpdatingBatch(true);
      // Assuming your API has an updateBookingStatus method

      const values: TourStatus = {
        tourId: selectedGroupId,
        statusBooking: batchStatus
      };

      await bookTourService.updateBookingStatus(values);

      enqueueSnackbar('Cập nhật trạng thái  tour thành công', { variant: 'success' });
      setSelectedBookings([]);
      setBatchUpdateOpen(false);
      fetchBookings();
    } catch (error) {
      console.error('Failed to update bookings in batch:', error);
      enqueueSnackbar('Không thể cập nhật trạng thái đặt tour', { variant: 'error' });
    } finally {
      setUpdatingBatch(false);
    }
  };

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
        <Card key={tourId} sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={tourGroup.bookings[0]?.agriculturalTourPackage?.imgs[0]} sx={{ width: 56, height: 56 }} variant="rounded" />
                <Stack>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {tourGroup.packageName}
                  </Typography>

                  <Typography variant="body2">
                    Số chỗ: {tourGroup.totalBookedPeople}/{tourGroup.slot}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Mã nhóm: {tourGroup.bookings[0]?.groupId}
                  </Typography>

                  <Box>
                    <Chip
                      label={getBookingStatusText(tourGroup.bookings[0]?.statusBooking)}
                      color={getBookingStatusColor(tourGroup.bookings[0]?.statusBooking)}
                      size="small"
                    />
                  </Box>
                </Stack>
              </Stack>
              <IconButton sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} onClick={() => toggleTour(tourId)}>
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
                      <TableRow
                        key={booking.bookingId}
                        hover
                        onClick={() => setSelectedBooking(booking)}
                        sx={{ cursor: 'pointer' }}
                        selected={selectedBookings.includes(booking.bookingId)}
                      >
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

            <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
              {/* Show "Chờ xác nhận" button only if not already in Processing status */}
              {tourGroup.bookings[0]?.statusBooking === StatusBooking.ConfirmBooking && (
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() => {
                    setSelectedGroupId(tourGroup.groupId);
                    setBatchStatus(StatusBooking.Processing);
                    setBatchUpdateOpen(true);
                  }}
                  startIcon={<span style={{ fontSize: '1.2rem' }}>⏳</span>}
                >
                  Chờ xác nhận
                </Button>
              )}

              {/* Show "Xác nhận đủ khách" button only if in Processing status */}
              {tourGroup.bookings[0]?.statusBooking === StatusBooking.Processing && (
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => {
                    setSelectedGroupId(tourGroup.groupId);
                    setBatchStatus(StatusBooking.ConfirmBooking);
                    setBatchUpdateOpen(true);
                  }}
                  startIcon={<span style={{ fontSize: '1.2rem' }}>✓</span>}
                >
                  Xác nhận đủ khách
                </Button>
              )}

              {/* Show "Đang diễn ra" button only if in ConfirmBooking status */}
              {tourGroup?.bookings[0]?.statusBooking === StatusBooking.ConfirmBooking && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    startIcon={<span style={{ fontSize: '1.2rem' }}>✏️</span>}
                    onClick={() => {
                      // Chuyển đến trang chi tiết tour hoặc trang quản lý tour
                      navigate(`${TOURISM_COMPANY_URLs.TOUR_PACKAGE.UPDATE}?id=${tourGroup?.bookings[0]?.agriculturalTourPackage?.tourId}`);
                    }}
                  >
                    Cập nhật hướng dẫn viên, tài xế
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="inherit"
                    onClick={() => {
                      setSelectedGroupId(tourGroup?.groupId);
                      setBatchStatus(StatusBooking.InProgress);
                      setBatchUpdateOpen(true);
                    }}
                    startIcon={<ClockCircleOutlined />}
                  >
                    Bắt đầu tour
                  </Button>
                </Stack>
              )}

              {/* Show "Hoàn thành" button only if in InProgress status */}
              {tourGroup?.bookings[0]?.statusBooking === StatusBooking.InProgress && (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => {
                    setSelectedGroupId(tourGroup?.groupId);
                    setBatchStatus(StatusBooking.Completed);
                    setBatchUpdateOpen(true);
                  }}
                  startIcon={<span style={{ fontSize: '1.2rem' }}>✅</span>}
                >
                  Hoàn thành
                </Button>
              )}

              {/* Show "Hủy" button for all statuses except Completed and Canceled */}
              {tourGroup?.bookings[0]?.statusBooking !== StatusBooking.Completed &&
                tourGroup?.bookings[0]?.statusBooking !== StatusBooking.InProgress &&
                tourGroup?.bookings[0]?.statusBooking !== StatusBooking.ConfirmBooking &&
                tourGroup?.bookings[0]?.statusBooking !== StatusBooking.Canceled && (
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                      setSelectedGroupId(tourGroup.groupId);
                      setBatchStatus(StatusBooking.Canceled);
                      setBatchUpdateOpen(true);
                    }}
                    startIcon={<span style={{ fontSize: '1.2rem' }}>❌</span>}
                  >
                    Hủy tour
                  </Button>
                )}
            </Stack>
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

                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          <strong>Trạng thái hiện tại:</strong>
                        </Typography>
                        <Chip
                          label={getBookingStatusText(selectedBooking.statusBooking)}
                          color={getBookingStatusColor(selectedBooking.statusBooking)}
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
      <Dialog open={batchUpdateOpen} onClose={() => setBatchUpdateOpen(false)}>
        <DialogTitle>
          <Typography variant="h6">Cập nhật trạng thái tour</Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ minWidth: 300, pt: 1 }}>
            <Typography>Bạn có chắc muốn cập nhật trạng thái tour.</Typography>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button color="error" onClick={() => setBatchUpdateOpen(false)}>
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBatchUpdateStatus}
                disabled={updatingBatch || batchStatus === null}
              >
                {updatingBatch ? <CircularProgress size={24} /> : 'Xác nhận'}
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingList;
