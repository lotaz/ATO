import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { createPackage } from '../../../redux/tourism-facility/package.slice';

const validationSchema = Yup.object().shape({
  packageName: Yup.string().required('Tên gói du lịch là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  price: Yup.number().required('Giá là bắt buộc').min(0, 'Giá phải lớn hơn 0').typeError('Giá phải là số'),
  durations: Yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0').typeError('Thời gian phải là số')
});

const CreatePackage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const initialValues = {
    packageName: '',
    description: '',
    price: '',
    durations: '',
    facilityId: '',
    tourCompanyId: ''
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await dispatch(createPackage(values)).unwrap();
      navigate(TOURISM_FACILITY_URLs.PACKAGE.INDEX);
    } catch (error) {
      console.error('Failed to create package:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Thêm gói du lịch mới
        </Typography>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên gói du lịch"
                    name="packageName"
                    value={values.packageName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.packageName && Boolean(errors.packageName)}
                    helperText={touched.packageName && errors.packageName}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Giá"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Thời gian (ngày)"
                    name="durations"
                    value={values.durations}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.durations && Boolean(errors.durations)}
                    helperText={touched.durations && errors.durations}
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
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.INDEX)}>
                      Hủy
                    </Button>
                    <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                      Tạo gói du lịch
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

export default CreatePackage;
