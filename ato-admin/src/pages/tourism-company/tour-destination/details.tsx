import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchTourDestination } from '../../../redux/tourism-company/tour-destination.slice';
import { DestinationType } from '../../../types/tourism-company/tour-destination.types';

const TourDestinationDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const packageId = params.get('packageId');
  const destinationId = params.get('destinationId');
  const { specific: destination, loading } = useSelector((state: RootState) => state.tourDestinationSlice);

  useEffect(() => {
    if (destinationId) {
      dispatch(fetchTourDestination(Number(destinationId)));
    }
  }, [dispatch, destinationId]);

  if (loading || !destination) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            startIcon={<ArrowLeftOutlined />}
            onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS + `?id=${packageId}`)}
          >
            Quay lại chi tiết gói
          </Button>
          <Typography variant="h5">Chi tiết điểm đến</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_DESTINATION.UPDATE + `?packageId=${packageId}&destinationId=${destinationId}`)}
        >
          Chỉnh sửa
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Loại điểm đến
          </Typography>
          <Typography>{destination.destinationType === DestinationType.TOURIST_SPOT ? 'Điểm du lịch' : 'Nhà nghỉ'}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Thông tin cơ bản
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Tên điểm đến
              </Typography>
              <Typography>{destination.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Mô tả
              </Typography>
              <Typography>{destination.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {destination.destinationType === DestinationType.TOURIST_SPOT ? 'Thời gian tham quan' : 'Thời gian ở lại'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                {destination.destinationType === DestinationType.TOURIST_SPOT ? 'Thời gian bắt đầu tham quan' : 'Thời gian nhận phòng'}
              </Typography>
              <Typography>{dayjs(destination.startTime).format('DD/MM/YYYY HH:mm')}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                {destination.destinationType === DestinationType.TOURIST_SPOT ? 'Thời gian kết thúc tham quan' : 'Thời gian trả phòng'}
              </Typography>
              <Typography>{dayjs(destination.endTime).format('DD/MM/YYYY HH:mm')}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Thông tin di chuyển
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Tài xế
              </Typography>
              <Typography>{destination.transport?.driver?.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Số điện thoại
              </Typography>
              <Typography>{destination.transport?.driver?.phone}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Thông tin phương tiện
              </Typography>
              <Typography>{destination.transport?.driver?.vehicle}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Thời gian khởi hành
              </Typography>
              <Typography>{dayjs(destination.transport?.departureTime).format('DD/MM/YYYY HH:mm')}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Thời gian đến
              </Typography>
              <Typography>{dayjs(destination.transport?.arrivalTime).format('DD/MM/YYYY HH:mm')}</Typography>
            </Grid>
            {destination.transport?.notes && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Ghi chú
                </Typography>
                <Typography>{destination.transport.notes}</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TourDestinationDetails;
