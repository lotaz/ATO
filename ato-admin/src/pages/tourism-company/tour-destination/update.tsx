import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import TransportForm from '../../../components/tourism-company/transport/TransportForm';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchTourDestination, updateTourDestination } from '../../../redux/tourism-company/tour-destination.slice';
import { DestinationType } from '../../../types/tourism-company/tour-destination.types';

const UpdateTourDestination = () => {
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

  // Add states for lists
  const [touristSpots] = useState([
    { id: 1, name: 'Vịnh Hạ Long' },
    { id: 2, name: 'Phố cổ Hội An' }
  ]);

  const [accommodations] = useState([
    { id: 1, name: 'Khách sạn Mường Thanh' },
    { id: 2, name: 'Resort Vinpearl' }
  ]);

  const validationSchema = Yup.object().shape({
    destinationType: Yup.string().required('Vui lòng chọn loại điểm đến'),
    destinationId: Yup.number().required('Vui lòng chọn điểm đến'),
    title: Yup.string().required('Vui lòng nhập tên điểm đến'),
    description: Yup.string(),
    startTime: Yup.date().required('Vui lòng chọn thời gian bắt đầu'),
    endTime: Yup.date()
      .min(Yup.ref('startTime'), 'Thời gian kết thúc phải sau thời gian bắt đầu')
      .required('Vui lòng chọn thời gian kết thúc'),
    transport: Yup.object().shape({
      driverId: Yup.number().required('Vui lòng chọn tài xế'),
      departureTime: Yup.date().required('Vui lòng chọn thời gian khởi hành'),
      arrivalTime: Yup.date()
        .min(Yup.ref('departureTime'), 'Thời gian đến phải sau thời gian khởi hành')
        .required('Vui lòng chọn thời gian đến'),
      notes: Yup.string()
    })
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await dispatch(
        updateTourDestination({
          ...values,
          tourDestinationsId: Number(destinationId),
          tourId: Number(packageId),
          tourismPackageId: Number(packageId)
        })
      ).unwrap();
      navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS + `?id=${packageId}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !destination) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS + `?id=${packageId}`)}>
          Quay lại chi tiết gói
        </Button>
        <Typography variant="h5">Cập nhật điểm đến</Typography>
      </Stack>

      <Formik
        initialValues={{
          destinationType: DestinationType.TOURIST_SPOT,
          destinationId: destination.tourDestinationsId || '',
          title: destination.title,
          description: destination.description,
          startTime: dayjs(destination.startTime),
          endTime: dayjs(destination.endTime),
          transport: destination.transport
            ? {
                ...destination.transport,
                departureTime: dayjs(destination.transport.departureTime),
                arrivalTime: dayjs(destination.transport.arrivalTime)
              }
            : {
                driverId: '',
                driver: null,
                departureTime: null,
                arrivalTime: null,
                notes: ''
              }
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Loại điểm đến
                  </Typography>
                  <FormControl>
                    <FormLabel>Chọn loại điểm đến</FormLabel>
                    <RadioGroup row name="destinationType" value={values.destinationType} onChange={handleChange}>
                      <FormControlLabel value={DestinationType.TOURIST_SPOT} control={<Radio />} label="Điểm du lịch" />
                      <FormControlLabel value={DestinationType.ACCOMMODATION} control={<Radio />} label="Nhà nghỉ" />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thông tin cơ bản
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label={values.destinationType === DestinationType.TOURIST_SPOT ? 'Chọn điểm du lịch' : 'Chọn nhà nghỉ'}
                        name="destinationId"
                        value={values.destinationId}
                        onChange={(e) => {
                          handleChange(e);
                          const selectedList = values.destinationType === DestinationType.TOURIST_SPOT ? touristSpots : accommodations;
                          const selected = selectedList.find((item) => item.id === Number(e.target.value));
                          if (selected) {
                            setFieldValue('title', selected.name);
                          }
                        }}
                        onBlur={handleBlur}
                        error={Boolean(touched.destinationId && errors.destinationId)}
                        helperText={touched.destinationId && errors.destinationId}
                      >
                        {values.destinationType === DestinationType.TOURIST_SPOT
                          ? touristSpots.map((spot) => (
                              <MenuItem key={spot.id} value={spot.id}>
                                {spot.name}
                              </MenuItem>
                            ))
                          : accommodations.map((acc) => (
                              <MenuItem key={acc.id} value={acc.id}>
                                {acc.name}
                              </MenuItem>
                            ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Mô tả"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {values.destinationType === DestinationType.TOURIST_SPOT ? 'Thời gian tham quan' : 'Thời gian ở lại'}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <DateTimePicker
                        label={
                          values.destinationType === DestinationType.TOURIST_SPOT ? 'Thời gian bắt đầu tham quan' : 'Thời gian nhận phòng'
                        }
                        value={values.startTime}
                        onChange={(date) => setFieldValue('startTime', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: Boolean(touched.startTime && errors.startTime),
                            helperText: touched.startTime && errors.startTime
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <DateTimePicker
                        label={
                          values.destinationType === DestinationType.TOURIST_SPOT ? 'Thời gian kết thúc tham quan' : 'Thời gian trả phòng'
                        }
                        value={values.endTime}
                        onChange={(date) => setFieldValue('endTime', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: Boolean(touched.endTime && errors.endTime),
                            helperText: touched.endTime && errors.endTime
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thông tin di chuyển
                  </Typography>
                  <TransportForm
                    values={values.transport}
                    touched={touched.transport || {}}
                    errors={errors.transport || {}}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={(field, value) => setFieldValue(`transport.${field}`, value)}
                  />
                </CardContent>
              </Card>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS + `?id=${packageId}`)}>
                  Hủy
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting} startIcon={<SaveOutlined />}>
                  Cập nhật điểm đến
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

export default UpdateTourDestination;
