import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { RootState } from '../../../../redux/store';
import { fetchActivity } from '../../../../redux/tourism-facility/activity.slice';

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
      dispatch(fetchActivity(Number(activityId)));
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
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.DETAILS}?id=${packageId}`)}>
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
              <DetailItem label="Tên hoạt động" value={activityData.name} />
              <DetailItem label="Địa điểm" value={activityData.location} />
              <DetailItem label="Thời gian (giờ)" value={activityData.durationInHours} />
              <DetailItem label="Thời gian nghỉ (phút)" value={activityData.breakTimeInMinutes} />
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
                  label={activityData.approvalStatus ? 'Đã duyệt' : 'Chưa duyệt'}
                  color={activityData.approvalStatus ? 'success' : 'warning'}
                />
                {activityData.approvalContent && <DetailItem label="Nội dung phê duyệt" value={activityData.approvalContent} />}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Hình ảnh
              </Typography>
              <Box
                component="img"
                src={activityData.imgs}
                alt={activityData.name}
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 1
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin thời gian
              </Typography>
              <DetailItem label="Ngày tạo" value={dayjs(activityData.createdDate).format('DD/MM/YYYY HH:mm')} />
              {activityData.updatedDate && (
                <DetailItem label="Cập nhật lần cuối" value={dayjs(activityData.updatedDate).format('DD/MM/YYYY HH:mm')} />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ActivityDetails;
