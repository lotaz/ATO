import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ProductSelector from '../../../../components/tourism-facility/ProductSelector';
import { MultipleFileUploader } from '../../../../components/upload/MultipleFileUploader';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { RootState } from '../../../../redux/store';
import { fetchActivity, updateActivity } from '../../../../redux/tourism-facility/activity.slice';
import { TimeType } from '../../../../types/tourism-facility/package.types';
import { ActivityRequest } from '../../../../types/tourism-facility/activity.types';
import { activityService } from '../../../../services/tourism-facility/activity.service';

const validationSchema = Yup.object().shape({
  activityName: Yup.string().required('Tên hoạt động là bắt buộc'),
  description: Yup.string(),
  durationInHours: Yup.number().min(0, 'Thời gian phải lớn hơn 0').typeError('Thời gian phải là số'),
  durationInHoursType: Yup.number().required('Loại thời gian là bắt buộc'),
  location: Yup.string(),
  breakTimeInMinutes: Yup.number().min(0, 'Thời gian nghỉ phải lớn hơn 0'),
  breakTimeInMinutesType: Yup.number().required('Loại thời gian nghỉ là bắt buộc'),
  startTime: Yup.date().required('Thời gian bắt đầu là bắt buộc'),
  endTime: Yup.date().required('Thời gian kết thúc là bắt buộc'),
  maxCapacity: Yup.number().min(1, 'Số tour tối đa phải lớn hơn 0').typeError('Số tour tối đa phải là số'),
  imgs: Yup.array().of(Yup.string()),
  products: Yup.array().of(
    Yup.object().shape({
      productId: Yup.string().required('ID sản phẩm là bắt buộc')
    })
  )
});

const UpdateActivity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const packageId = params.get('packageId');
  const activityId = params.get('activityId');

  const { specific: activityData, loading } = useSelector((state: RootState) => state.activitySlice);

  useEffect(() => {
    if (activityId) {
      dispatch(fetchActivity(activityId));
    }
  }, [dispatch, activityId]);

  if (loading || !activityData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const requestData: ActivityRequest = {
        ...values,
        packageId: packageId,
        products: values.products?.map((p: any) => ({ productId: p.productId }))
      };

      await activityService.updateActivity(activityId!, requestData);

      navigate(TOURISM_FACILITY_URLs.PACKAGE.DETAILS.replace(':id', packageId!));
    } catch (error) {
      console.error('Failed to update activity:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Cập nhật hoạt động
        </Typography>

        <Formik
          initialValues={{
            activityName: activityData.activityName,
            description: activityData.description,
            durationInHours: activityData.durationInHours,
            durationInHoursType: TimeType.HOUR,
            location: activityData.location,
            breakTimeInMinutes: activityData.breakTimeInMinutes,
            breakTimeInMinutesType: TimeType.MINUTE,
            startTime: activityData.startTime,
            endTime: activityData.endTime,
            imgs: activityData.imgs || [],
            products: activityData.products || [],
            maxCapacity: activityData.maxCapacity || 1
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên hoạt động"
                    name="activityName"
                    value={values.activityName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.activityName && Boolean(errors.activityName)}
                    helperText={touched.activityName && errors.activityName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Giới hạn số tour"
                    name="maxCapacity"
                    value={values.maxCapacity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.maxCapacity && Boolean(errors.maxCapacity)}
                    helperText={touched.maxCapacity && errors.maxCapacity}
                  ></TextField>
                </Grid>

                {/* Add new fields for time type selection */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Thời gian (giờ)"
                    name="durationInHours"
                    value={values.durationInHours}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.durationInHours && Boolean(errors.durationInHours)}
                    helperText={touched.durationInHours && errors.durationInHours}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Loại thời gian"
                    name="durationInHoursType"
                    value={values.durationInHoursType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.durationInHoursType && Boolean(errors.durationInHoursType)}
                    helperText={touched.durationInHoursType && errors.durationInHoursType}
                  >
                    {Object.values(TimeType)
                      .filter((v) => !isNaN(Number(v)))
                      .map((type) => (
                        <MenuItem key={type} value={type}>
                          {TimeType[type as keyof typeof TimeType]}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                {/* Add similar fields for break time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Thời gian nghỉ (phút)"
                    name="breakTimeInMinutes"
                    value={values.breakTimeInMinutes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.breakTimeInMinutes && Boolean(errors.breakTimeInMinutes)}
                    helperText={touched.breakTimeInMinutes && errors.breakTimeInMinutes}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Loại thời gian nghỉ"
                    name="breakTimeInMinutesType"
                    value={values.breakTimeInMinutesType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.breakTimeInMinutesType && Boolean(errors.breakTimeInMinutesType)}
                    helperText={touched.breakTimeInMinutesType && errors.breakTimeInMinutesType}
                  >
                    {Object.values(TimeType)
                      .filter((v) => !isNaN(Number(v)))
                      .map((type) => (
                        <MenuItem key={type} value={type}>
                          {TimeType[type as keyof typeof TimeType]}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                {/* Add date/time pickers for start and end time */}
                <Grid item xs={12} md={6}>
                  <DateTimePicker
                    label="Thời gian bắt đầu"
                    value={dayjs(values.startTime)}
                    onChange={(date) => setFieldValue('startTime', date)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DateTimePicker
                    label="Thời gian kết thúc"
                    value={dayjs(values.endTime)}
                    onChange={(date) => setFieldValue('endTime', date)}
                  />
                </Grid>

                {/* Add product selection */}
                <Grid item xs={12}>
                  <ProductSelector selectedProducts={values.products} onChange={(products) => setFieldValue('products', products)} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa điểm"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
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
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Hình ảnh
                    </Typography>
                    <MultipleFileUploader
                      values={values.imgs || []}
                      onChange={(urls) => setFieldValue('imgs', urls)}
                      accept="image/*"
                      maxFiles={5}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.DETAILS.replace(':id', packageId)}`)}
                    >
                      Hủy
                    </Button>
                    <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                      Cập nhật
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default UpdateActivity;
