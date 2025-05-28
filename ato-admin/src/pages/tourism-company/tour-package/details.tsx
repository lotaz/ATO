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
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';
import { AgriculturalTourPackageResponse } from '../../../types/tourism-company/agricultural-tour.types';
import { TimeType } from '../../../types/tourism-facility/package.types';
import { DurationType } from '../../../types/tourism-company/tour-package.types';
import HtmlParagraph from '../../../components/HtmlParagraph';

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
    <HtmlParagraph html={value} />
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

  useEffect(() => {
    if (id) {
      fetchTourPackage();
    }
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const fetchTourPackage = async () => {
    try {
      setLoading(true);
      const response = await agriculturalTourService.getPackageById(id!);
      setTourPackage(response.data);
    } catch (error) {
      console.error('Failed to fetch tour package:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDurationType = (type: DurationType) => {
    const types = {
      [DurationType.HOURS]: 'Giờ',
      [DurationType.DAYS]: 'Ngày',
      [DurationType.MONTHS]: 'Tháng',
      [DurationType.WEEKS]: 'Tuần'
    };
    return types[type] || 'Undefined';
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!tourPackage) return <Typography>Tour package not found</Typography>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX)}>
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
                {tourPackage.tourDestinations.map((destination, index) => (
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
                          <Typography variant="h6" color="primary" gutterBottom>
                            {destination.title}
                          </Typography>
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
                                Bắt đầu
                              </Typography>
                              <Typography variant="body2">{dayjs(destination.startTime).format('DD/MM/YYYY HH:mm')}</Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Kết thúc
                              </Typography>
                              <Typography variant="body2">{dayjs(destination.endTime).format('DD/MM/YYYY HH:mm')}</Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </TimelineContent>
                  </TimelineItem>
                ))}
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
      </Card>
    </Stack>
  );
};

export default TourPackageDetails;
