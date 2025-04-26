import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { packageService } from '../../../services/content-moderator/package.service';
import { StatusApproval } from '../../../types/content-moderator/certification.types';
import { StatusOperating, TimeType, TourismPackageResponse } from '../../../types/tourism-facility/package.types';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Tab, Tabs, Typography, Paper } from '@mui/material';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <Box sx={{ py: 1 }}>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value || '-'}</Typography>
  </Box>
);

const TourPackageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [tourPackage, setTourPackage] = useState<TourismPackageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (id) {
      fetchTourPackage();
    }
  }, [id]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const fetchTourPackage = async () => {
    try {
      setLoading(true);
      const response = await packageService.getPackageById(id!);
      console.log('res', response.data);

      setTourPackage(response.data);
    } catch (error) {
      console.error('Failed to fetch tour package:', error);
    } finally {
      setLoading(false);
    }
  };
  const getStatusApprovalLabel = (status: StatusApproval) => {
    const labels = {
      [StatusApproval.Approved]: 'Đã duyệt',
      [StatusApproval.Processing]: 'Đang xử lý',
      [StatusApproval.Reject]: 'Từ chối',
      [StatusApproval.Update]: 'Cập nhật'
    };
    return labels[status] || 'Không xác định';
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
    return types[type] || 'Undefined';
  };

  if (loading) return null;
  if (!tourPackage) return <Typography>Tour package not found</Typography>;

  const handleApproval = async (status: StatusApproval) => {
    setLoading(true);
    const response = await packageService.processApproval(id!, status);
    const data = response.data;
    enqueueSnackbar(data?.message ?? 'Thao tác thất bại', { variant: data?.status ? 'success' : 'error' });

    if (data.status) {
      navigate('/content-moderator/package');
    }
  };
  const getOperatingStatusLabel = (status: StatusOperating) => {
    return status === StatusOperating.ACTIVE ? 'Hoạt động' : 'Không hoạt động';
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(CONTENT_MODERATOR_URLs.PACKAGE.INDEX)}>
            Quay lại danh sách
          </Button>
          <Typography variant="h5">Chi tiết chuyến đi</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          {(tourPackage.statusApproval === StatusApproval.Processing || tourPackage.statusApproval === StatusApproval.Update) && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleOutlined />}
                onClick={() => handleApproval(StatusApproval.Approved)}
                disabled={loading}
              >
                Duyệt
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseCircleOutlined />}
                onClick={() => handleApproval(StatusApproval.Reject)}
                disabled={loading}
              >
                Từ chối
              </Button>
            </>
          )}
          {tourPackage.statusApproval === StatusApproval.Reject && (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleOutlined />}
              onClick={() => handleApproval(StatusApproval.Approved)}
              disabled={loading}
            >
              Duyệt
            </Button>
          )}
          {tourPackage.statusApproval === StatusApproval.Approved && (
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseCircleOutlined />}
              onClick={() => handleApproval(StatusApproval.Reject)}
              disabled={loading}
            >
              Từ chối
            </Button>
          )}
        </Stack>
      </Stack>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Thông tin cơ bản" />
            <Tab label="Điểm đến" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <CardContent>
            <Stack spacing={3}>
              <Box>
                <DetailItem label="Tên gói" value={tourPackage.packageName} />
                <DetailItem label="Cơ sở du lịch" value={tourPackage.touristFacility?.touristFacilityName} />
                <DetailItem label="Mô tả" value={tourPackage.description} />
              </Box>

              <Box>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" spacing={4}>
                  <Box flex={1}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                      <DollarOutlined />
                      <DetailItem label="Giá" value={`${tourPackage.price.toLocaleString()} VND`} />
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarOutlined />
                      <DetailItem label="Thời gian" value={`${tourPackage.durations} ${getDurationType(tourPackage.durationsType)}`} />
                    </Stack>
                  </Box>
                  <Box flex={1}>
                    <DetailItem label="Số hoạt động" value={tourPackage.activities?.length || 0} />
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DetailItem label="Trạng thái duyệt" value={getStatusApprovalLabel(tourPackage.statusApproval)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem label="Trạng thái hoạt động" value={getOperatingStatusLabel(tourPackage.statusOperating)} />
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Divider sx={{ mb: 2 }} />
                <DetailItem label="Ngày tạo" value={dayjs(tourPackage.createDate).format('DD/MM/YYYY HH:mm')} />
                {tourPackage.updateDate && (
                  <DetailItem label="Cập nhật lần cuối" value={dayjs(tourPackage.updateDate).format('DD/MM/YYYY HH:mm')} />
                )}
              </Box>

              {tourPackage.replyRequest && (
                <Box>
                  <Typography variant="h6" gutterBottom color="primary">
                    Phản hồi
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <DetailItem label="Nội dung" value={tourPackage.replyRequest} />
                </Box>
              )}
            </Stack>
          </CardContent>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <CardContent>
            {tourPackage.activities && tourPackage.activities.length > 0 ? (
              <Timeline position="alternate">
                {tourPackage.activities.map((activity, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot sx={{ bgcolor: 'primary.main' }}>
                        <CalendarOutlined />
                      </TimelineDot>
                      {index !== tourPackage.activities!.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Typography variant="h6" color="primary" gutterBottom>
                            {activity.activityName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {activity.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            ) : (
              <Typography>Không có hoạt động nào</Typography>
            )}
          </CardContent>
        </TabPanel>
      </Card>
    </Stack>
  );
};

export default TourPackageDetails;
