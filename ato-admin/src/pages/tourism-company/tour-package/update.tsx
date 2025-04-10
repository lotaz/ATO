import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { DurationType } from '../../../types/tourism-company/tour-package.types';
import { AgriculturalTourPackageResponse } from '../../../types/tourism-company/agricultural-tour.types';
import { useEffect, useState } from 'react';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';

const UpdateTourPackage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
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

  const validationSchema = Yup.object().shape({
    packageName: Yup.string().required('Vui lòng nhập tên gói'),
    description: Yup.string().required('Vui lòng nhập mô tả'),
    slot: Yup.number().min(1, 'Số chỗ phải lớn hơn 0').required('Vui lòng nhập số chỗ'),
    startTime: Yup.date().required('Vui lòng chọn thời gian bắt đầu'),
    endTime: Yup.date()
      .min(Yup.ref('startTime'), 'Thời gian kết thúc phải sau thời gian bắt đầu')
      .required('Vui lòng chọn thời gian kết thúc'),
    durations: Yup.number().min(0.5, 'Thời lượng phải lớn hơn 0.5').required('Vui lòng nhập thời lượng'),
    durationsType: Yup.number().required('Vui lòng chọn đơn vị thời gian'),
    price: Yup.number().min(0, 'Giá không được âm').required('Vui lòng nhập giá')
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await agriculturalTourService.updatePackage(id, {
        ...values,
        tourId: id
      });
      navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX);
    } finally {
      setSubmitting(false);
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
        <Typography variant="h5">Cập nhật gói du lịch</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Formik
            initialValues={{
              packageName: tourPackage.packageName,
              description: tourPackage.description,
              slot: tourPackage.slot,
              startTime: dayjs(tourPackage.startTime),
              endTime: dayjs(tourPackage.endTime),
              durations: tourPackage.durations,
              durationsType: tourPackage.durationsType,
              price: tourPackage.price
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tên gói du lịch"
                      name="packageName"
                      value={values.packageName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.packageName && errors.packageName)}
                      helperText={touched.packageName && errors.packageName}
                    />
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

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Số chỗ"
                      name="slot"
                      value={values.slot}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.slot && errors.slot)}
                      helperText={touched.slot && errors.slot}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Giá (VNĐ)"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DateTimePicker
                      label="Thời gian bắt đầu"
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
                      label="Thời gian kết thúc"
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

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Thời lượng"
                      name="durations"
                      value={values.durations}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.durations && errors.durations)}
                      helperText={touched.durations && errors.durations}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Đơn vị thời gian"
                      name="durationsType"
                      value={values.durationsType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.durationsType && errors.durationsType)}
                      helperText={touched.durationsType && errors.durationsType}
                    >
                      <MenuItem value={DurationType.HOURS}>Giờ</MenuItem>
                      <MenuItem value={DurationType.DAYS}>Ngày</MenuItem>
                      <MenuItem value={DurationType.WEEKS}>Tuần</MenuItem>
                      <MenuItem value={DurationType.MONTHS}>Tháng</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained" disabled={isSubmitting}>
                      Cập nhật gói du lịch
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default UpdateTourPackage;
