import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { MultipleFileUploader } from '../../../../components/upload/MultipleFileUploader';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { CreateCertificateRequest } from '../../../../types/tourism-facility/certificate.types';

const validationSchema = Yup.object().shape({
  certificationName: Yup.string().required('Tên chứng chỉ là bắt buộc'),
  issuingOrganization: Yup.string().required('Tổ chức cấp là bắt buộc'),
  issueDate: Yup.string().required('Ngày cấp là bắt buộc'),
  certificationDetails: Yup.string().required('Chi tiết chứng chỉ là bắt buộc'),
  imgs: Yup.array().min(1, 'Cần ít nhất một hình ảnh')
});

const CreateCertificate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get('productId');

  useEffect(() => {
    if (!productId) {
      navigate(TOURISM_FACILITY_URLs.PRODUCT.INDEX);
    }
  }, [productId, navigate]);

  const initialValues: CreateCertificateRequest = {
    productId: Number(productId),
    certificationName: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    certificationDetails: '',
    imgs: []
  };

  const handleSubmit = async (values: CreateCertificateRequest, { setSubmitting }: any) => {
    try {
      // TODO: Add create certificate action
      // await dispatch(createCertificate(values)).unwrap();
      navigate(`${TOURISM_FACILITY_URLs.PRODUCT.CERTIFICATES}?productId=${productId}`);
    } catch (error) {
      console.error('Failed to create certificate:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Thêm chứng chỉ mới
        </Typography>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
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
                      Thêm chứng chỉ
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

export default CreateCertificate;
