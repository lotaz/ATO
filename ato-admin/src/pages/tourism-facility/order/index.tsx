import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../../services/tourism-facility/order.service';
import { OrderResponse, OrderType, PaymentStatus, StatusOrder } from '../../../types/tourism-facility/order.types';
import dayjs from 'dayjs';
import AppSearchBar from '../../../components/table/SearchBar';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrders();
        console.log('data', data);
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) || dayjs(order.orderDate).format('DD/MM/YYYY').includes(searchText)
  );

  const getStatusColor = (status: StatusOrder) => {
    switch (status) {
      case StatusOrder.Completed:
        return 'success';
      case StatusOrder.Processing:
        return 'warning';
      case StatusOrder.Canceled:
        return 'error';
      case StatusOrder.Shipped:
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: StatusOrder) => {
    switch (status) {
      case StatusOrder.Completed:
        return 'Hoàn thành';
      case StatusOrder.Processing:
        return 'Đang xử lý';
      case StatusOrder.Canceled:
        return 'Đã hủy';
      case StatusOrder.Shipped:
        return 'Đang giao';
      default:
        return 'Không xác định';
    }
  };

  const getPaymentStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Paid:
        return 'Đã thanh toán';
      case PaymentStatus.UnPaid:
        return 'Chưa thanh toán';
      case PaymentStatus.Failed:
        return 'Thanh toán thất bại';
      case PaymentStatus.Refunded:
        return 'Đã hoàn tiền';
      default:
        return 'Không xác định';
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <Stack spacing={3}>
      <AppSearchBar
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Tìm kiếm theo mã đơn hoặc ngày đặt..."
      />

      {filteredOrders.length > 0 ? (
        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã đơn</TableCell>
                    <TableCell>Ngày đặt</TableCell>
                    <TableCell>Loại đơn</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Thanh toán</TableCell>
                    <TableCell>Tổng tiền</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')}</TableCell>
                      <TableCell>{order.orderType === OrderType.Online ? 'Online' : 'Tại chỗ'}</TableCell>
                      <TableCell>
                        <Chip label={getStatusLabel(order.statusOrder)} color={getStatusColor(order.statusOrder)} />
                      </TableCell>
                      <TableCell>{getPaymentStatusLabel(order.paymentStatus)}</TableCell>
                      <TableCell>{order.totalAmount.toLocaleString()} VND</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`${TOURISM_FACILITY_URLs.ORDER.DETAILS}?id=${order.orderId}`)}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <Box mt={4}>Không có hóa đơn nào</Box>
      )}
    </Stack>
  );
};

export default OrderList;
