import { CloseOutlined } from '@ant-design/icons';
import {
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { paymentService, VNPayPaymentResponse } from '../../../services/tourism-facility/history-payment';
import AppSearchBar from '../../../components/table/SearchBar';
import { NoDataDisplay } from '../../../components/no-data/NoDataDisplay';

const OrderPaymentHistory = () => {
  const [payments, setPayments] = useState<VNPayPaymentResponse[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<VNPayPaymentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handlePaymentClick = (payment: VNPayPaymentResponse) => {
    setSelectedPayment(payment);
  };

  const handleCloseDialog = () => {
    setSelectedPayment(null);
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case '00':
        return 'Thành công';
      default:
        return 'Thất bại';
    }
  };

  const getOrderStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Chờ xác nhận';
      case 1:
        return 'Đã xác nhận';
      case 2:
        return 'Hoàn thành';
      case -1:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getOrderStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return 'warning';
      case 1:
        return 'info';
      case 2:
        return 'success';
      case -1:
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDateTime = (date: string | undefined | null) => {
    return date ? moment(date).format('DD/MM/YYYY HH:mm') : 'N/A';
  };

  const formatCurrency = (amount: number | undefined | null) => {
    return amount ? `${new Intl.NumberFormat('vi-VN').format(amount)} VNĐ` : 'N/A';
  };

  // Add new state for search
  const [searchText, setSearchText] = useState('');

  // Add filtered payments logic
  const filteredPayments = payments.filter(
    (payment) =>
      payment.txnRef?.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.order?.orderId?.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.bankCode?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Add pagination logic
  const paginatedPayments = filteredPayments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Stack spacing={3}>
      <AppSearchBar placeholder="Tìm kiếm theo mã giao dịch, mã đơn hàng, ngân hàng" onChange={(e) => setSearchText(e.target.value)} />
      <Stack spacing={2}>
        {loading ? (
          <Stack alignItems="center" py={3}>
            <Typography>Đang tải...</Typography>
          </Stack>
        ) : filteredPayments.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã giao dịch</TableCell>
                    <TableCell>Mã đơn hàng</TableCell>
                    <TableCell>Thời gian</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedPayments.map((payment) => (
                    <TableRow key={payment.responseId} hover onClick={() => handlePaymentClick(payment)} sx={{ cursor: 'pointer' }}>
                      <TableCell>{payment.txnRef}</TableCell>
                      <TableCell>{payment.order?.orderId}</TableCell>
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
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filteredPayments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số dòng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong ${count}`}
            />
          </>
        ) : (
          <NoDataDisplay />
        )}
      </Stack>

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
                      <strong>Thông tin đơn hàng</strong>
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Mã đơn hàng:</strong> {selectedPayment.order?.orderId || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Ngày đặt hàng:</strong> {formatDateTime(selectedPayment.order?.orderDate)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Trạng thái đơn hàng:</strong>{' '}
                          <Chip
                            label={getOrderStatusText(selectedPayment.order?.statusOrder)}
                            color={getOrderStatusColor(selectedPayment.order?.statusOrder)}
                            size="small"
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Tổng tiền sản phẩm:</strong> {formatCurrency(selectedPayment.order?.totalAmountProducts)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Phí vận chuyển:</strong> {formatCurrency(selectedPayment.order?.totalShip)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Tổng thanh toán:</strong> {formatCurrency(selectedPayment.order?.totalAmount)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                      <strong>Thông tin khách hàng</strong>
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Họ và tên:</strong> {selectedPayment.order?.account?.fullname || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Email:</strong> {selectedPayment.order?.account?.email || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Tên đăng nhập:</strong> {selectedPayment.order?.account?.userName || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Giới tính:</strong>{' '}
                          {selectedPayment.order?.account?.gender !== undefined
                            ? selectedPayment.order.account.gender
                              ? 'Nam'
                              : 'Nữ'
                            : 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Ngày sinh:</strong>{' '}
                          {selectedPayment.order?.account?.dob ? moment(selectedPayment.order.account.dob).format('DD/MM/YYYY') : 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Trạng thái tài khoản:</strong>{' '}
                          <Chip
                            label={
                              selectedPayment.order?.account?.isAccountActive !== undefined
                                ? selectedPayment.order.account.isAccountActive
                                  ? 'Đang hoạt động'
                                  : 'Đã khóa'
                                : 'N/A'
                            }
                            color={
                              selectedPayment.order?.account?.isAccountActive !== undefined
                                ? selectedPayment.order.account.isAccountActive
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
                      <strong>Chi tiết sản phẩm</strong>
                    </Typography>
                    {selectedPayment.order?.orderDetails.map((detail, index) => (
                      <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                              {detail.product.imgs && (
                                <img
                                  src={detail.product.imgs[0]}
                                  alt={detail.product.productName}
                                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                                />
                              )}
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Typography variant="h6">{detail.product.productName}</Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Số lượng:</strong> {detail.quantity}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Đơn giá:</strong> {formatCurrency(detail.unitPrice)}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Thành tiền:</strong> {formatCurrency(detail.quantity * detail.unitPrice)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}
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
                          <strong>Mã giao dịch:</strong> {selectedPayment.txnRef}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Ngân hàng:</strong> {selectedPayment.bankCode}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Loại thẻ:</strong> {selectedPayment.cardType}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Số tiền:</strong> {formatCurrency(selectedPayment.amount)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Thời gian:</strong> {formatDateTime(selectedPayment.payDate)}
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
    </Stack>
  );
};

export default OrderPaymentHistory;
