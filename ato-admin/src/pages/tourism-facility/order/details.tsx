import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { orderService, ShipAddressResponse } from '../../../services/tourism-facility/order.service';
import { OrderResponse, PaymentStatus, StatusOrder } from '../../../types/tourism-facility/order.types';
import { LoadingButton } from '@mui/lab';

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('id');
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [shipAddress, setShipAddress] = useState<ShipAddressResponse | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        setLoading(true);
        const data = await orderService.getOrderDetails(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    const fetchShipAddress = async () => {
      if (!order?.shipAddressId) return;

      try {
        const data = await orderService.getShipAddressDetails(order.shipAddressId);
        setShipAddress(data);
      } catch (error) {
        console.error('Failed to fetch shipping address:', error);
      }
    };

    if (order?.shipAddressId) {
      fetchShipAddress();
    }
  }, [order?.shipAddressId]);

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

  if (loading || !order) {
    return <div>Loading...</div>;
  }

  const DetailItem = ({ label, value }: { label: string; value: any }) => (
    <Box sx={{ py: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || '-'}</Typography>
    </Box>
  );

  const handleShipOrder = async () => {
    try {
      setShipping(true);
      await orderService.shipOrder({
        client_order_code: order.orderId,
        content: `Shipping order ${order.orderId}`,
        shipAddressId: order.shipAddressId,
        insurance_value: 0, // Set appropriate value
        cod_amount: order.totalAmount, // Or set appropriate COD amount,
        weight: 100
      });
      // Refresh order details after shipping
      const data = await orderService.getOrderDetails(orderId!);
      setOrder(data);
    } catch (error) {
      console.error('Failed to ship order:', error);
    } finally {
      setShipping(false);
    }
  };

  // In the return section, add the ship button:
  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.ORDER.INDEX)}>
          Quay lại
        </Button>
        <Typography variant="h5">Chi tiết đơn hàng #{order.orderId}</Typography>
        {order.statusOrder === StatusOrder.Processing && (
          <>
            {order.bookingId !== undefined && order.bookingId !== null ? (
              <LoadingButton variant="contained" color="primary" loading={shipping} sx={{ ml: 'auto' }}>
                Xác nhận
              </LoadingButton>
            ) : (
              <LoadingButton variant="contained" color="primary" loading={shipping} onClick={handleShipOrder} sx={{ ml: 'auto' }}>
                Giao hàng
              </LoadingButton>
            )}
          </>
        )}
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
              <DetailItem label="Loại đơn" value={order.orderType === 0 ? 'Online' : 'Tại chỗ'} />
              <DetailItem
                label="Trạng thái"
                value={<Chip label={getStatusLabel(order.statusOrder)} color={getStatusColor(order.statusOrder)} />}
              />
              <DetailItem label="Tình trạng thanh toán" value={getPaymentStatusLabel(order.paymentStatus)} />
              <DetailItem label="Tổng tiền" value={order.totalAmount.toLocaleString() + ' VND'} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin vận chuyển
              </Typography>
              <DetailItem
                label="Địa chỉ giao hàng"
                value={
                  shipAddress ? (
                    <Box>
                      <Typography>{shipAddress.toName}</Typography>
                      <Typography>{shipAddress.toPhone}</Typography>
                      <Typography>
                        {shipAddress?.toWardName}, {shipAddress?.toDistrictName}
                      </Typography>
                      {shipAddress.defaultAddress && <Chip label="Default Address" color="primary" size="small" sx={{ mt: 1 }} />}
                    </Box>
                  ) : (
                    'Đang tải...'
                  )
                }
              />
              {order.cancelDate && <DetailItem label="Ngày hủy" value={dayjs(order.cancelDate).format('DD/MM/YYYY HH:mm')} />}
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Sản phẩm
              </Typography>
              {order.orderDetails.map((item) => (
                <Card key={item.orderId} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography variant="subtitle1">{item.product?.productName}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body1">Số lượng: {item.quantity}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body1">{item.unitPrice.toLocaleString()} VND</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {order.vnPayPaymentResponses?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Thông tin thanh toán
                </Typography>
                <>
                  {order.vnPayPaymentResponses?.map((payment) => (
                    <Box key={payment.transactionNo} sx={{ mb: 2 }}>
                      <DetailItem label="Mã giao dịch" value={payment.transactionNo} />
                      <DetailItem label="Ngân hàng" value={payment.bankCode} />
                      <DetailItem label="Số tiền" value={payment.amount.toLocaleString() + ' VND'} />
                      <DetailItem label="Thời gian" value={dayjs(payment.payDate).format('DD/MM/YYYY HH:mm')} />
                    </Box>
                  ))}
                </>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default OrderDetails;
