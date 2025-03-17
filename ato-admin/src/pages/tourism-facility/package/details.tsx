import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { RootState } from '../../../redux/store';
import { fetchPackage } from '../../../redux/tourism-facility/package.slice';
import ActivityList from './activity';

const PackageDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const packageId = params.get('id');

  const { specific: packageData, loading } = useSelector((state: RootState) => state.packageSlice);

  useEffect(() => {
    if (packageId) {
      dispatch(fetchPackage(Number(packageId)));
    }
  }, [dispatch, packageId]);

  if (loading || !packageData) {
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
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.INDEX)}>
          Quay lại
        </Button>
        <Typography variant="h5">Chi tiết gói du lịch</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin cơ bản
              </Typography>
              <DetailItem label="Tên gói" value={packageData.packageName} />
              <DetailItem label="Giá" value={`${packageData.price.toLocaleString()} VND`} />
              <DetailItem label="Thời gian" value={`${packageData.durations} ngày`} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Mô tả
              </Typography>
              <DetailItem label="Chi tiết" value={packageData.description} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin thời gian
              </Typography>
              <DetailItem label="Ngày tạo" value={dayjs(packageData.createdDate).format('DD/MM/YYYY HH:mm')} />
              {packageData.updatedDate && (
                <DetailItem label="Cập nhật lần cuối" value={dayjs(packageData.updatedDate).format('DD/MM/YYYY HH:mm')} />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Danh sách hoạt động</Typography>
          </Stack>
          <ActivityList packageId={Number(packageId)} />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default PackageDetails;
