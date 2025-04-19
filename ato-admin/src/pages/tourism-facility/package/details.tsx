import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { packageService } from '../../../services/tourism-facility/package.service';
import { StatusApproval, StatusOperating, TimeType, TourismPackageResponse } from '../../../types/tourism-facility/package.types';
import ActivityList from './activity';

const PackageDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [packageData, setPackageData] = useState<TourismPackageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPackage(id);
    }
  }, [id]);

  const fetchPackage = async (packageId: string) => {
    try {
      setIsLoading(true);
      const response = await packageService.getPackage(packageId);
      console.log('response', response.data);
      setPackageData(response.data);
    } catch (error) {
      console.error('Failed to fetch package:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !packageData) {
    return <Typography>Đang tải...</Typography>;
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
              <DetailItem label="Thời gian" value={`${packageData.durations} ${getDurationType(packageData.durationsType)}`} />
              <DetailItem label="Trạng thái duyệt" value={getStatusApprovalLabel(packageData.statusApproval)} />
              <DetailItem label="Trạng thái hoạt động" value={getOperatingStatusLabel(packageData.statusOperating)} />
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
              <DetailItem label="Ngày tạo" value={dayjs(packageData.createDate).format('DD/MM/YYYY HH:mm')} />
              {packageData.updateDate && (
                <DetailItem label="Cập nhật lần cuối" value={dayjs(packageData.updateDate).format('DD/MM/YYYY HH:mm')} />
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
          <ActivityList activities={packageData.activities ?? []} packageId={id} />
        </CardContent>
      </Card>
    </Stack>
  );
};

const getDurationType = (type: TimeType) => {
  const types = {
    [TimeType.SECOND]: 'Giây',
    [TimeType.MINUTE]: 'Phút',
    [TimeType.HOUR]: 'Giờ',
    [TimeType.DAY]: 'Ngày',
    [TimeType.MONTH]: 'Tháng',
    [TimeType.YEAR]: 'Năm'
  };
  return types[type] || 'Không xác định';
};

const getStatusApprovalLabel = (status: StatusApproval) => {
  const labels = {
    [StatusApproval.APPROVED]: 'Đã duyệt',
    [StatusApproval.PROCESSING]: 'Đang xử lý',
    [StatusApproval.REJECT]: 'Từ chối',
    [StatusApproval.UPDATE]: 'Cập nhật'
  };
  return labels[status] || 'Không xác định';
};

const getOperatingStatusLabel = (status: StatusOperating) => {
  return status === StatusOperating.ACTIVE ? 'Hoạt động' : 'Không hoạt động';
};

export default PackageDetails;
