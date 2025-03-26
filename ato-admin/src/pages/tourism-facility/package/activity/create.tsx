import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Formik } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { activityService } from '../../../../services/tourism-facility/activity.service';
import { TimeType } from '../../../../types/tourism-facility/package.types';
import { MultipleFileUploader } from '../../../../components/upload/MultipleFileUploader';
import { CreateActivityRequest } from '../../../../types/tourism-facility/activity.types';

const validationSchema = Yup.object().shape({
  activityName: Yup.string().required('Tên hoạt động là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  durationInHours: Yup.number().min(0, 'Thời gian phải lớn hơn 0').required('Thời gian là bắt buộc'),
  durationInHoursType: Yup.number().required('Đơn vị thời gian là bắt buộc'),
  location: Yup.string(),
  imgs: Yup.array().of(Yup.string()).required('Hình ảnh là bắt buộc'),
  breakTimeInMinutes: Yup.number().required('Thời gian nghỉ là bắt buộc').min(0, 'Thời gian nghỉ phải lớn hơn 0'),
  breakTimeInMinutesType: Yup.number().required('Đơn vị thời gian nghỉ là bắt buộc'),
  startTime: Yup.date().required('Thời gian bắt đầu là bắt buộc'),
  endTime: Yup.date().required('Thời gian kết thúc là bắt buộc')
});

const CreateActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const packageId = params.get('packageId');

  const initialValues = {
    activityName: '',
    description: '',
    durationInHours: 0,
    durationInHoursType: TimeType.HOUR,
    location: '',
    imgs: [],
    breakTimeInMinutes: 0,
    breakTimeInMinutesType: TimeType.MINUTE,
    startTime: null,
    endTime: null,
    packageId
  };

  const handleSubmit = async (values: CreateActivityRequest, { setSubmitting }: any) => {
    try {
      await activityService.create(values);
      navigate(TOURISM_FACILITY_URLs.PACKAGE.DETAILS.replace(':id', packageId));
    } catch (error) {
      console.error('Failed to create activity:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.DETAILS.replace(':id', packageId))}>
          Quay lại
        </Button>
        <Typography variant="h5">Thêm hoạt động mới</Typography>
      </Stack>

      <Card sx={{ p: 3 }}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
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

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Thời gian"
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
                    select
                    fullWidth
                    label="Đơn vị thời gian"
                    name="durationInHoursType"
                    value={values.durationInHoursType}
                    onChange={handleChange}
                    error={touched.durationInHoursType && Boolean(errors.durationInHoursType)}
                    helperText={touched.durationInHoursType && errors.durationInHoursType}
                  >
                    <MenuItem value={TimeType.MINUTE}>Phút</MenuItem>
                    <MenuItem value={TimeType.HOUR}>Giờ</MenuItem>
                    <MenuItem value={TimeType.DAY}>Ngày</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Thời gian nghỉ"
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
                    select
                    fullWidth
                    label="Đơn vị thời gian nghỉ"
                    name="breakTimeInMinutesType"
                    value={values.breakTimeInMinutesType}
                    onChange={handleChange}
                    error={touched.breakTimeInMinutesType && Boolean(errors.breakTimeInMinutesType)}
                    helperText={touched.breakTimeInMinutesType && errors.breakTimeInMinutesType}
                  >
                    <MenuItem value={TimeType.SECOND}>Giây</MenuItem>
                    <MenuItem value={TimeType.MINUTE}>Phút</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <DateTimePicker
                    label="Thời gian bắt đầu"
                    value={values.startTime}
                    onChange={(value) => setFieldValue('startTime', value)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: touched.startTime && Boolean(errors.startTime),
                        helperText: touched.startTime && errors.startTime
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DateTimePicker
                    label="Thời gian kết thúc"
                    value={values.endTime}
                    onChange={(value) => setFieldValue('endTime', value)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: touched.endTime && Boolean(errors.endTime),
                        helperText: touched.endTime && errors.endTime
                      }
                    }}
                  />
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
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Hình ảnh
                  </Typography>
                  <MultipleFileUploader values={values.imgs} onChange={(urls) => setFieldValue('imgs', urls)} maxFiles={5} />
                  {touched.imgs && errors.imgs && (
                    <Typography color="error" variant="caption">
                      {errors.imgs}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.DETAILS.replace(':id', packageId))}>
                      Hủy
                    </Button>
                    <LoadingButton variant="contained" type="submit" loading={isSubmitting} startIcon={<SaveOutlined />}>
                      Tạo hoạt động
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </Stack>
  );
};

export default CreateActivity;
