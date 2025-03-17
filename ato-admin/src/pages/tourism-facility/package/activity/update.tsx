import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { fetchActivity, updateActivity } from '../../../../redux/tourism-facility/activity.slice';
import { RootState } from '../../../../redux/store';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên hoạt động là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  durationInHours: Yup.number().min(0, 'Thời gian phải lớn hơn 0').typeError('Thời gian phải là số'),
  location: Yup.string(),
  breakTimeInMinutes: Yup.number().required('Thời gian nghỉ là bắt buộc').min(0, 'Thời gian nghỉ phải lớn hơn 0'),
  imgs: Yup.string().required('Hình ảnh là bắt buộc')
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
      dispatch(fetchActivity(Number(activityId)));
    }
  }, [dispatch, activityId]);

  if (loading || !activityData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await dispatch(updateActivity({ id: Number(activityId), data: values })).unwrap();
      navigate(TOURISM_FACILITY_URLs.PACKAGE.ACTIVITY.INDEX(Number(packageId)));
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
            name: activityData.name,
            description: activityData.description,
            durationInHours: activityData.durationInHours,
            location: activityData.location,
            breakTimeInMinutes: activityData.breakTimeInMinutes,
            imgs: activityData.imgs
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Same form fields as create page */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên hoạt động"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

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
                  <TextField
                    fullWidth
                    label="Hình ảnh URL"
                    name="imgs"
                    value={values.imgs}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.imgs && Boolean(errors.imgs)}
                    helperText={touched.imgs && errors.imgs}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => navigate(`${TOURISM_FACILITY_URLs.PACKAGE.DETAILS}?id=${packageId}`)}>
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
