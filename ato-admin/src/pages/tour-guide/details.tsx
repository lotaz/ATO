import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CarOutlined,
  GlobalOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOUR_GUIDE_URLs } from '../../constants/tour-guide-urls';
import { tourTrackingService } from '../../services/tour-tracking';
import { AgriculturalTourPackageResponse } from '../../types/tourism-company/agricultural-tour.types';
import { TimeType } from '../../types/tourism-facility/package.types';
import { get, post, put } from '../../helpers/axios-helper';
import { BookingDestinationStatus, BookingTourDestination } from './types';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TouristInfo {
  name?: string;
  phone?: string;
  email?: string;
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
  const [tourPackage, setTourPackage] = useState<AgriculturalTourPackageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openTrackingModal, setOpenTrackingModal] = useState(false);
  const [currentTracking, setCurrentTracking] = useState<BookingTourDestination | null>(null);
  const [tourists, setTourists] = useState<TouristInfo[]>([]);

  useEffect(() => {
    if (id) {
      fetchTourPackage();
    }
  }, [id]);

  useEffect(() => {
    const fetchTourists = async () => {
      if (!id) return;
      try {
        const response = await get(`/general/tourist/${id}`);
        setTourists(response.data);
      } catch (error) {
        console.error('Failed to fetch tourists:', error);
      }
    };

    fetchTourists();
  }, [id]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const fetchTourPackage = async () => {
    try {
      setLoading(true);
      const response = await tourTrackingService.getPackageById(id!);
      setTourPackage(response.data);
    } catch (error) {
      console.error('Failed to fetch tour package:', error);
    } finally {
      setLoading(false);
    }
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

  const handleOpenTrackingModal = (destinationId: string, status: BookingDestinationStatus) => {
    const existingTracking = tourPackage?.tourDestinations.find((dest) => dest.destinationId === destinationId)?.tracking;

    setCurrentTracking({
      bookingDestinationId: existingTracking?.bookingDestinationId,
      tourId: id!,
      tourDestinationId: destinationId,
      status: status,
      actualStartTime: status === BookingDestinationStatus.InProgress ? new Date() : undefined,
      actualEndTime: status === BookingDestinationStatus.Completed ? new Date() : undefined,
      notes: existingTracking?.notes || ''
    });
    setOpenTrackingModal(true);
  };

  const handleCloseTrackingModal = () => {
    setOpenTrackingModal(false);
    setCurrentTracking(null);
  };
  const getStatusMessage = (status: BookingDestinationStatus): string => {
    switch (status) {
      case BookingDestinationStatus.Pending:
        return 'Chưa bắt đầu';
      case BookingDestinationStatus.InProgress:
        return 'Đang thực hiện';
      case BookingDestinationStatus.Completed:
        return 'Hoàn thành';
      case BookingDestinationStatus.Canceled:
        return 'Đã hủy';
      case BookingDestinationStatus.Skipped:
        return 'Đã bỏ qua';
      default:
        return 'Chưa bắt đầu';
    }
  };
  const handleSaveTracking = async () => {
    if (!currentTracking) return;

    try {
      const response = await post('/tracking', currentTracking);

      fetchTourPackage();
      handleCloseTrackingModal();
    } catch (error) {
      console.error('Failed to update tracking:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!tourPackage) return <Typography>Tour package not found</Typography>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOUR_GUIDE_URLs.PACKAGE.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Chi tiết chuyến đi </Typography>
      </Stack>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Thông tin cơ bản" />
            <Tab label="Điểm đến" />
            <Tab label="Hướng dẫn viên" />
            <Tab label="Du khách" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DetailItem label="Tên gói" value={tourPackage.packageName} />
                <DetailItem label="Mô tả" value={tourPackage.description} />
                <DetailItem label="Thời gian" value={`${tourPackage.durations} ${getDurationType(tourPackage.durationsType)}`} />
                <DetailItem label="Giá người lớn" value={`${tourPackage.priceOfAdults.toLocaleString()} VND`} />
                <DetailItem label="Giá trẻ em" value={`${tourPackage.priceOfChildren.toLocaleString()} VND`} />
              </Grid>
              {tourPackage.imgs && tourPackage.imgs.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Hình ảnh
                  </Typography>
                  <Grid container spacing={2}>
                    {tourPackage.imgs.map((img, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <img src={img} alt={`Tour ${index + 1}`} style={{ width: '100%', borderRadius: 8 }} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <CardContent>
            {tourPackage.tourDestinations && tourPackage.tourDestinations.length > 0 ? (
              <Timeline position="alternate">
                {tourPackage.tourDestinations.map((destination, index) => {
                  const tracking = tourPackage.trackings?.find((x) => x.tourDestinationId === destination.tourDestinationId);

                  return (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: 'primary.main' }}>
                          {destination.typeActivity === 0 ? (
                            <CalendarOutlined />
                          ) : destination.typeActivity === 1 ? (
                            <CarOutlined />
                          ) : (
                            <HomeOutlined />
                          )}
                        </TimelineDot>
                        {index !== tourPackage?.tourDestinations?.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                          <CardContent>
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                              <Typography variant="h6" color="primary" gutterBottom>
                                {destination.title}
                              </Typography>
                              {tracking && <Chip label={getStatusMessage(tracking.status)} color={getStatusColor(tracking.status)} />}

                              {!tracking && <Chip label={'Chưa bắt đầu'} color="warning" />}
                            </Stack>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              {/* <Typography variant="caption" color="text.secondary">
                                Thứ tự: {destination.visitOrder}
                              </Typography> */}
                              <Typography variant="caption" color="text.secondary">
                                •
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {destination.typeActivity === 0 ? 'Hoạt động' : destination.typeActivity === 1 ? 'Di chuyển' : 'Lưu trú'}
                              </Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {destination.description}
                            </Typography>

                            <Box
                              sx={{
                                bgcolor: 'background.default',
                                p: 2,
                                borderRadius: 1,
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  Thời gian bắt đầu dự kiến
                                </Typography>
                                <Typography variant="body2">{dayjs(destination.startTime).format('DD/MM/YYYY HH:mm')}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  Thời gian kết thúc dự kiến
                                </Typography>
                                <Typography variant="body2">{dayjs(destination.endTime).format('DD/MM/YYYY HH:mm')}</Typography>
                              </Box>
                            </Box>

                            {tracking && (
                              <Box
                                sx={{
                                  bgcolor: 'background.default',
                                  p: 2,
                                  borderRadius: 1,
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  mt: 2
                                }}
                              >
                                <Box>
                                  <Typography variant="caption" color="text.secondary">
                                    Thời gian bắt đầu thực tế
                                  </Typography>
                                  <Typography variant="body2">
                                    {tracking.actualStartTime ? dayjs(tracking.actualStartTime).format('DD/MM/YYYY HH:mm') : 'Chưa có'}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">
                                    Thời gian kết thúc thực tế
                                  </Typography>
                                  <Typography variant="body2">
                                    {tracking.actualEndTime ? dayjs(tracking.actualEndTime).format('DD/MM/YYYY HH:mm') : 'Chưa có'}
                                  </Typography>
                                </Box>
                              </Box>
                            )}

                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                              {(!tracking || tracking.status === BookingDestinationStatus.Pending) && (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() =>
                                    handleOpenTrackingModal(destination.tourDestinationId, BookingDestinationStatus.InProgress)
                                  }
                                >
                                  Bắt đầu
                                </Button>
                              )}
                              {tracking && tracking.status === BookingDestinationStatus.InProgress && (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="success"
                                  onClick={() => handleOpenTrackingModal(destination.tourDestinationId, BookingDestinationStatus.Completed)}
                                >
                                  Hoàn thành
                                </Button>
                              )}
                            </Stack>
                          </CardContent>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
            ) : (
              <Typography>Không có điểm đến nào</Typography>
            )}
          </CardContent>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <CardContent>
            {tourPackage.tourGuides && tourPackage.tourGuides.length > 0 ? (
              <Grid container spacing={3}>
                {tourPackage.tourGuides.map((guide, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card
                      variant="outlined"
                      sx={{
                        '&:hover': {
                          boxShadow: 3,
                          transition: 'box-shadow 0.3s ease-in-out'
                        }
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                              sx={{
                                width: 64,
                                height: 64,
                                bgcolor: 'primary.main'
                              }}
                              src={guide.account?.avatarURL}
                            >
                              {guide.account?.fullname?.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" gutterBottom>
                                {guide.account?.fullname}
                              </Typography>
                              <Chip
                                icon={<TrophyOutlined />}
                                label={`${guide.expertiseArea} `}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          </Stack>

                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <MailOutlined style={{ color: 'text.secondary' }} />
                              <Typography>{guide.account?.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PhoneOutlined style={{ color: 'text.secondary' }} />
                              <Typography>{guide.account?.phoneNumber}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <GlobalOutlined style={{ color: 'text.secondary' }} />
                              <Stack direction="row" spacing={1} flexWrap="wrap">
                                {guide.languages
                                  ?.split(',')
                                  .map((language, idx) => (
                                    <Chip key={idx} label={language.trim()} size="small" variant="outlined" sx={{ margin: '2px' }} />
                                  ))}
                              </Stack>
                            </Box>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>Không có hướng dẫn viên nào</Typography>
            )}
          </CardContent>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <CardContent>
            {tourists.length > 0 ? (
              <Grid container spacing={3}>
                {tourists.map((tourist, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack spacing={2}>
                          <Typography variant="h6">{tourist.name || 'Không có tên'}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneOutlined style={{ color: 'text.secondary' }} />
                            <Typography>{tourist.phone || 'Không có số điện thoại'}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MailOutlined style={{ color: 'text.secondary' }} />
                            <Typography>{tourist.email || 'Không có email'}</Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>Không có du khách nào</Typography>
            )}
          </CardContent>
        </TabPanel>
      </Card>
      <Dialog fullWidth open={openTrackingModal} onClose={handleCloseTrackingModal}>
        <DialogTitle>{'Cập nhật lộ trình'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {currentTracking?.status === BookingDestinationStatus.InProgress && (
              <TextField
                fullWidth
                label="Thời gian bắt đầu thực tế"
                type="datetime-local"
                value={currentTracking.actualStartTime ? dayjs(currentTracking.actualStartTime).format('YYYY-MM-DDTHH:mm') : ''}
                onChange={(e) => setCurrentTracking((prev) => (prev ? { ...prev, actualStartTime: new Date(e.target.value) } : null))}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
            {currentTracking?.status === BookingDestinationStatus.Completed && (
              <TextField
                fullWidth
                label="Thời gian kết thúc thực tế"
                type="datetime-local"
                value={currentTracking.actualEndTime ? dayjs(currentTracking.actualEndTime).format('YYYY-MM-DDTHH:mm') : ''}
                onChange={(e) => setCurrentTracking((prev) => (prev ? { ...prev, actualEndTime: new Date(e.target.value) } : null))}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
            <TextField
              fullWidth
              margin="normal"
              label="Ghi chú"
              multiline
              rows={4}
              value={currentTracking?.notes || ''}
              onChange={(e) => setCurrentTracking((prev) => (prev ? { ...prev, notes: e.target.value } : null))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTrackingModal}>Hủy</Button>
          <Button onClick={handleSaveTracking} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default TourPackageDetails;

const getStatusColor = (status: BookingDestinationStatus): string => {
  switch (status) {
    case BookingDestinationStatus.Pending:
      return 'info';
    case BookingDestinationStatus.InProgress:
      return 'info';
    case BookingDestinationStatus.Completed:
      return 'success';
    case BookingDestinationStatus.Canceled:
      return 'error';
    case BookingDestinationStatus.Skipped:
      return 'text';
    default:
      return 'warning';
  }
};
