import {
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { RootState } from '../../../redux/store';
import { fetchOrders } from '../../../redux/tourism-facility/order.slice';
import { OrderStatus, PaymentStatus } from '../../../types/tourism-facility/order.types';
import AppSearchBar from '../../../components/table/SearchBar';

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { list: orders, loading } = useSelector((state: RootState) => state.orderSlice);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredOrders = orders.filter(
    (order) => order.orderId.toString().includes(searchTerm) || order.customerId.toString().includes(searchTerm)
  );

  return (
    <Stack spacing={3}>
      <AppSearchBar
        placeholder="Tìm kiếm theo mã đơn hàng hoặc mã khách hàng"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã đơn</TableCell>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Ngày đặt</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Thanh toán</TableCell>
                    <TableCell align="right">Tổng tiền</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                    <TableRow key={order.orderId} hover>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customerId}</TableCell>
                      <TableCell>{dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')}</TableCell>
                      <TableCell>
                        <Chip
                          label={
                            order.status === OrderStatus.Completed
                              ? 'Hoàn thành'
                              : order.status === OrderStatus.Cancelled
                                ? 'Đã hủy'
                                : order.status === OrderStatus.Shipped
                                  ? 'Đang giao'
                                  : 'Đang xử lý'
                          }
                          color={
                            order.status === OrderStatus.Completed
                              ? 'success'
                              : order.status === OrderStatus.Cancelled
                                ? 'error'
                                : order.status === OrderStatus.Shipped
                                  ? 'info'
                                  : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            order.paymentStatus === PaymentStatus.Paid
                              ? 'Đã thanh toán'
                              : order.paymentStatus === PaymentStatus.Failed
                                ? 'Thất bại'
                                : order.paymentStatus === PaymentStatus.Refunded
                                  ? 'Đã hoàn tiền'
                                  : 'Chưa thanh toán'
                          }
                          color={
                            order.paymentStatus === PaymentStatus.Paid
                              ? 'success'
                              : order.paymentStatus === PaymentStatus.Failed
                                ? 'error'
                                : order.paymentStatus === PaymentStatus.Refunded
                                  ? 'info'
                                  : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">{order.totalAmount.toLocaleString()} VND</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => navigate(`${TOURISM_FACILITY_URLs.ORDER.DETAILS}?id=${order.orderId}`)}>
                          <EyeOutlined />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Đang tải...
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading && filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Không tìm thấy đơn hàng nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredOrders.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50]}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default OrderList;
