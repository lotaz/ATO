import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { RootState } from '../../../redux/store';
import { fetchOrder, updateOrderStatus, updatePaymentStatus } from '../../../redux/tourism-facility/order.slice';
import { OrderDetail, OrderStatus, PaymentStatus } from '../../../types/tourism-facility/order.types';

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Completed:
      return 'Hoàn thành';
    case OrderStatus.Cancelled:
      return 'Đã hủy';
    case OrderStatus.Shipped:
      return 'Đang giao';
    case OrderStatus.Processing:
      return 'Đang xử lý';
    default:
      return status;
  }
};

const getPaymentStatusLabel = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.Paid:
      return 'Đã thanh toán';
    case PaymentStatus.UnPaid:
      return 'Chưa thanh toán';
    case PaymentStatus.Failed:
      return 'Thất bại';
    case PaymentStatus.Refunded:
      return 'Đã hoàn tiền';
    default:
      return status;
  }
};

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [updating, setUpdating] = useState(false);
  const { specific: order, loading } = useSelector((state: RootState) => state.orderSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrder(Number(id)));
    }
  }, [dispatch, id]);

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setUpdating(true);
      await dispatch(updateOrderStatus({ id: Number(id), status: newStatus })).unwrap();
    } catch (error) {
      console.error('Failed to update order status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handlePaymentStatusUpdate = async (newStatus: string) => {
    try {
      setUpdating(true);
      await dispatch(updatePaymentStatus({ id: Number(id), paymentStatus: newStatus })).unwrap();
    } catch (error) {
      console.error('Failed to update payment status:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !order) {
    return <div>Đang tải...</div>;
  }

  const DetailItem = ({ label, value }: { label: string; value: any }) => (
    <Box sx={{ py: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || '-'}</Typography>
    </Box>
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.ORDER.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Chi tiết đơn hàng</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin đơn hàng
              </Typography>
              <DetailItem label="Mã đơn hàng" value={order.orderId} />
              <DetailItem label="Ngày đặt" value={dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')} />
              <DetailItem label="Loại đơn hàng" value={order.orderType === 'Online' ? 'Trực tuyến' : 'Tại chỗ'} />
              <DetailItem label="Tổng tiền" value={`${order.totalAmount.toLocaleString()} VND`} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin khách hàng
              </Typography>
              <DetailItem label="Mã khách hàng" value={order.customerId} />
              <DetailItem label="Tên khách hàng" value={order.customer?.name} />
              <DetailItem label="Số điện thoại" value={order.customer?.phone} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Quản lý trạng thái
              </Typography>
              <Stack spacing={2}>
                <TextField
                  select
                  fullWidth
                  label="Trạng thái đơn hàng"
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  disabled={updating}
                >
                  {Object.values(OrderStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {getStatusLabel(status)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Trạng thái thanh toán"
                  value={order.paymentStatus}
                  onChange={(e) => handlePaymentStatusUpdate(e.target.value)}
                  disabled={updating}
                >
                  {Object.values(PaymentStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {getPaymentStatusLabel(status)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Chi tiết sản phẩm
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {order.orderDetails.map((detail: OrderDetail) => (
                <Grid item xs={12} key={`${detail.orderId}-${detail.productId}`}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle1">{detail.product?.productName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography color="text.secondary">Số lượng: {detail.quantity}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography color="text.secondary">Đơn giá: {detail.unitPrice.toLocaleString()} VND</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="subtitle2">Thành tiền: {detail.totalPrice.toLocaleString()} VND</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default OrderDetails;
