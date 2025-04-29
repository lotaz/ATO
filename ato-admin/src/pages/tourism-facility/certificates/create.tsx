import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { post } from '../../../helpers/axios-helper';
import { FacilityCertification, StatusApproval } from '../../../types/tourism-facility/certificate.types';

const validationSchema = Yup.object().shape({
  certificationName: Yup.string().required('Tên chứng chỉ là bắt buộc'),
  imgs: Yup.array().min(1, 'Cần ít nhất một hình ảnh'),
  issueDate: Yup.date().required('Ngày cấp là bắt buộc'),
  expiryDate: Yup.date().required('Ngày hết hạn là bắt buộc'),
  certificationDetails: Yup.string().required('Chi tiết chứng chỉ là bắt buộc'),
  statusApproval: Yup.string().required('Trạng thái là bắt buộc')
});

const CreateCertificate = () => {
  const navigate = useNavigate();

  const initialValues: FacilityCertification = {
    certificationId: '550e8400-e29b-41d4-a716-446655440000',
    certificationName: '',
    imgs: [],
    issueDate: new Date(),
    expiryDate: new Date(),
    certificationDetails: '',
    createDate: new Date(),
    statusApproval: StatusApproval.Processing
  };

  const handleSubmit = async (values: FacilityCertification, { setSubmitting }: any) => {
    try {
      const response = await post('/facility-certifications', values);
      if (response.data) {
        navigate(TOURISM_FACILITY_URLs.CERTIFICATES.INDEX);
      }
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
          Tạo chứng chỉ mới
        </Typography>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Hình ảnh chứng chỉ
                  </Typography>
                  <MultipleFileUploader values={values.imgs} onChange={(urls) => setFieldValue('imgs', urls)} />
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
                    type="date"
                    label="Ngày cấp"
                    name="issueDate"
                    value={values.issueDate.toISOString().split('T')[0]}
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
                    value={values.expiryDate.toISOString().split('T')[0]}
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
                    <Button variant="outlined" onClick={() => navigate(TOURISM_FACILITY_URLs.CERTIFICATES.INDEX)}>
                      Hủy bỏ
                    </Button>
                    <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                      Tạo chứng chỉ
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
