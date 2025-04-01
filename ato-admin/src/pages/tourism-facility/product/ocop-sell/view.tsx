import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { RootState } from '../../../../redux/store';
import { fetchOCOPSell } from '../../../../redux/tourism-facility/ocop-sell.slice';

const ViewOCOPSell = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const productId = params.get('productId');

  const { selectedOCOPSell: ocopSell, loading } = useSelector((state: RootState) => state.ocopSellSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchOCOPSell(id));
    }
  }, [dispatch, id]);

  if (loading || !ocopSell) {
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

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}?productId=${productId}`)}
        >
          Trở về chi tiết sản phẩm
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Chi tiết đợt bán OCOP</Typography>
              <Chip
                label={dayjs(ocopSell.expiryDate).isAfter(dayjs()) ? 'Còn hạn' : 'Hết hạn'}
                color={dayjs(ocopSell.expiryDate).isAfter(dayjs()) ? 'success' : 'error'}
              />
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DetailItem label="Số lượng bán" value={`${ocopSell.sellVolume} sản phẩm`} />
                <DetailItem label="Giá bán" value={`${ocopSell.salePrice.toLocaleString('vi-VN')} đ`} />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailItem label="Ngày sản xuất" value={dayjs(ocopSell.manufacturingDate).format('DD/MM/YYYY')} />
                <DetailItem label="Ngày hết hạn" value={dayjs(ocopSell.expiryDate).format('DD/MM/YYYY')} />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.OCOP_SELL.UPDATE(productId!, id!)}`)}
                  >
                    Cập nhật
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ViewOCOPSell;
