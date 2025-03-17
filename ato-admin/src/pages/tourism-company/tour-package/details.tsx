import { ArrowLeftOutlined, ArrowRightOutlined, CaretRightFilled, CarTwoTone, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Box,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { fetchTourPackage } from '../../../redux/tourism-company/tour-package.slice';
import { RootState } from '../../../redux/store';
import { DurationType } from '../../../types/tourism-company/tour-package.types';
import { fetchTourDestinations } from '../../../redux/tourism-company/tour-destination.slice';
import { PlusOutlined } from '@ant-design/icons';
import { ArrowRightIcon } from '@mui/x-date-pickers';

const TourPackageDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const { specific: tourPackage, loading } = useSelector((state: RootState) => state.tourPackageSlice);
  const { list: destinations, loading: loadingDestinations } = useSelector((state: RootState) => state.tourDestinationSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchTourPackage(Number(id)));
      dispatch(fetchTourDestinations(Number(id)));
    }
  }, [dispatch, id]);

  const getDurationType = (type: DurationType) => {
    switch (type) {
      case DurationType.HOURS:
        return 'Giờ';
      case DurationType.DAYS:
        return 'Ngày';
      case DurationType.WEEKS:
        return 'Tuần';
      case DurationType.MONTHS:
        return 'Tháng';
      default:
        return '';
    }
  };

  if (loading || !tourPackage) {
    return <Typography>Đang tải...</Typography>;
  }

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
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Lộ trình du lịch</Typography>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_DESTINATION.CREATE(Number(id)))}
            >
              Thêm điểm đến
            </Button>
          </Stack>

          {loadingDestinations ? (
            <Typography>Đang tải...</Typography>
          ) : (
            <Stack spacing={2} sx={{ mt: 2 }}>
              {destinations.map((destination, index) => (
                <Box key={destination.tourDestinationsId}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <Typography variant="h6">{destination.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {dayjs(destination.startTime).format('DD/MM/YYYY HH:mm')} -{' '}
                              {dayjs(destination.endTime).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography>{destination.description}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <IconButton
                              color="primary"
                              onClick={() =>
                                navigate(TOURISM_COMPANY_URLs.TOUR_DESTINATION.DETAILS(Number(id), destination.tourDestinationsId))
                              }
                            >
                              <EyeOutlined />
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={() =>
                                navigate(TOURISM_COMPANY_URLs.TOUR_DESTINATION.UPDATE(Number(id), destination.tourDestinationsId))
                              }
                            >
                              <EditOutlined />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {index < destinations.length - 1 && (
                    <Stack
                      alignItems="center"
                      sx={{
                        position: 'relative',
                        mt: 2
                      }}
                    >
                      <ArrowRightOutlined />
                    </Stack>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TourPackageDetails;
