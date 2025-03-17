import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { MultipleFileUploader } from '../../../../components/upload/MultipleFileUploader';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { RootState } from '../../../../redux/store';
import { fetchCertificate, updateCertificate } from '../../../../redux/tourism-facility/certificate.slice';

const validationSchema = Yup.object().shape({
  certificationName: Yup.string().required('Tên chứng chỉ là bắt buộc'),
  issuingOrganization: Yup.string().required('Tổ chức cấp là bắt buộc'),
  issueDate: Yup.string().required('Ngày cấp là bắt buộc'),
  certificationDetails: Yup.string().required('Chi tiết chứng chỉ là bắt buộc'),
  imgs: Yup.array().min(1, 'Cần ít nhất một hình ảnh')
});

const UpdateCertificate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const productId = params.get('productId');

  const { specific: certificate, loading } = useSelector((state: RootState) => state.certificateSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchCertificate(Number(id)));
    }
  }, [dispatch, id]);

  if (loading || !certificate) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await dispatch(updateCertificate({ id: Number(id), data: values })).unwrap();
      navigate(`${TOURISM_FACILITY_URLs.PRODUCT.CERTIFICATES}?productId=${productId}`);
    } catch (error) {
      console.error('Failed to update certificate:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Cập nhật chứng chỉ
        </Typography>

        <Formik
          initialValues={{
            certificationName: certificate.certificationName,
            issuingOrganization: certificate.issuingOrganization,
            issueDate: dayjs(certificate.issueDate).format('YYYY-MM-DD'),
            expiryDate: certificate.expiryDate ? dayjs(certificate.expiryDate).format('YYYY-MM-DD') : '',
            certificationDetails: certificate.certificationDetails,
            imgs: certificate.imgs || []
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Hình ảnh chứng chỉ
                  </Typography>
                  <MultipleFileUploader values={values.imgs} onChange={(urls) => setFieldValue('imgs', urls)} />
                  {touched.imgs && errors.imgs && (
                    <Typography color="error" variant="caption">
                      {errors.imgs}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên chứng chỉ"
                    name="certificationName"
                    value={values.certificationName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.certificationName && Boolean(errors.certificationName)}
                    helperText={touched.certificationName && errors.certificationName}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tổ chức cấp"
                    name="issuingOrganization"
                    value={values.issuingOrganization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.issuingOrganization && Boolean(errors.issuingOrganization)}
                    helperText={touched.issuingOrganization && errors.issuingOrganization}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Ngày cấp"
                    name="issueDate"
                    value={values.issueDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.issueDate && Boolean(errors.issueDate)}
                    helperText={touched.issueDate && errors.issueDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Ngày hết hạn"
                    name="expiryDate"
                    value={values.expiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.expiryDate && Boolean(errors.expiryDate)}
                    helperText={touched.expiryDate && errors.expiryDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Chi tiết chứng chỉ"
                    name="certificationDetails"
                    value={values.certificationDetails}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.certificationDetails && Boolean(errors.certificationDetails)}
                    helperText={touched.certificationDetails && errors.certificationDetails}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}?productId=${productId}`)}>
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

export default UpdateCertificate;
