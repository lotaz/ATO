import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { RootState } from '../../../../redux/store';
import { fetchActivity } from '../../../../redux/tourism-facility/activity.slice';
import { ImageCarousel } from '../../../../components/carousel/ImageCarousel';

// Add this import at the top

const ActivityDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const packageId = params.get('packageId');
  const activityId = params.get('activityId');

  const { specific: activityData, loading } = useSelector((state: RootState) => state.activitySlice);

  useEffect(() => {
    if (activityId) {
      dispatch(fetchActivity(activityId));
    }
  }, [dispatch, activityId]);

  if (loading || !activityData) {
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
          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.DETAILS.replace(':id', packageId)}`)}
        >
          Quay lại
        </Button>
        <Typography variant="h5">Chi tiết hoạt động</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin cơ bản
              </Typography>
              <DetailItem label="Tên hoạt động" value={activityData.activityName} />
              <DetailItem label="Địa điểm" value={activityData.location} />
              <DetailItem label="Thời gian (giờ)" value={activityData.durationInHours} />
              <DetailItem label="Thời gian nghỉ (phút)" value={activityData.breakTimeInMinutes} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* Add this new section for products */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Sản phẩm
              </Typography>
              {activityData.products && activityData.products.length > 0 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {activityData.products.map((product: any) => (
                    <Chip key={product.productId} label={product.productName} variant="outlined" sx={{ mb: 1 }} />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Không có sản phẩm nào
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Mô tả
              </Typography>
              <DetailItem label="Chi tiết" value={activityData.description} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Trạng thái phê duyệt
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={activityData.statusApproval ? 'Đã duyệt' : 'Chưa duyệt'}
                  color={activityData.statusApproval ? 'success' : 'warning'}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Hình ảnh
              </Typography>
              <ImageCarousel images={activityData.imgs} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin thời gian
              </Typography>
              <DetailItem label="Ngày tạo" value={dayjs(activityData.createDate).format('DD/MM/YYYY HH:mm')} />
              {activityData.updateDate && (
                <DetailItem label="Cập nhật lần cuối" value={dayjs(activityData.updateDate).format('DD/MM/YYYY HH:mm')} />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ActivityDetails;
