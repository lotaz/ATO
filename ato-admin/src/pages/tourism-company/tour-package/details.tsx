import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';
import { AgriculturalTourPackageResponse } from '../../../types/tourism-company/agricultural-tour.types';
import { TimeType } from '../../../types/tourism-facility/package.types';

const TourPackageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [tourPackage, setTourPackage] = useState<AgriculturalTourPackageResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTourPackage();
    }
  }, [id]);

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

  if (loading) return <Typography>Đang tải...</Typography>;
  if (!tourPackage) return <Typography>Không tìm thấy gói du lịch</Typography>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Chi tiết gói du lịch</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {tourPackage.packageName}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {tourPackage.imgs && tourPackage.imgs.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                  {tourPackage.imgs.map((img, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={img}
                      alt={`Tour ${index + 1}`}
                      sx={{ height: 200, objectFit: 'cover', borderRadius: 1 }}
                    />
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Số chỗ
                  </Typography>
                  <Typography>{tourPackage.slot}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Giá
                  </Typography>
                  <Typography>{tourPackage.price.toLocaleString('vi-VN')} đ</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Thời lượng
                  </Typography>
                  <Typography>
                    {tourPackage.durations} {getDurationType(tourPackage.durationsType)}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Thời gian bắt đầu
                  </Typography>
                  <Typography>{dayjs(tourPackage.startTime).format('DD/MM/YYYY HH:mm')}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Thời gian kết thúc
                  </Typography>
                  <Typography>{dayjs(tourPackage.endTime).format('DD/MM/YYYY HH:mm')}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ngày tạo
                  </Typography>
                  <Typography>{dayjs(tourPackage.createDate).format('DD/MM/YYYY HH:mm')}</Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Mô tả
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>{tourPackage.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {tourPackage.tourDestinations && tourPackage.tourDestinations.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Lộ trình du lịch
            </Typography>
            <Stack spacing={2}>
              {tourPackage.tourDestinations.map((destination, index) => (
                <Box key={destination.tourDestinationId}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Typography variant="h6">{destination.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {dayjs(destination.startTime).format('DD/MM/YYYY HH:mm')} -
                            {dayjs(destination.endTime).format('DD/MM/YYYY HH:mm')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Typography>{destination.description}</Typography>
                          {destination.activity && (
                            <Box mt={2}>
                              <Typography variant="subtitle2">Hoạt động: {destination.activity.activityName}</Typography>
                              <Typography variant="body2">{destination.activity.description}</Typography>
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {index < tourPackage.tourDestinations.length - 1 && (
                    <Stack alignItems="center" sx={{ my: 2 }}>
                      <ArrowRightOutlined />
                    </Stack>
                  )}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {tourPackage.tourGuides && tourPackage.tourGuides.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Hướng dẫn viên
            </Typography>
            <Grid container spacing={2}>
              {tourPackage.tourGuides.map((guide) => (
                <Grid item xs={12} md={4} key={guide.guideId}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6">{guide.account?.fullName}</Typography>
                        <Typography variant="body2">Email: {guide.account?.email}</Typography>
                        <Typography variant="body2">SĐT: {guide.account?.phone}</Typography>
                        <Typography variant="body2">Chuyên môn: {guide.expertiseArea}</Typography>
                        <Typography variant="body2">Ngôn ngữ: {guide.languages}</Typography>
                        <Typography variant="body2">Đánh giá: {guide.rating}/5</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default TourPackageDetails;
