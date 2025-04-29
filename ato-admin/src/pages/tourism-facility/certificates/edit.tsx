import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { FacilityCertification, StatusApproval } from '../../../types/tourism-facility/certificate.types';
import { get, put } from '../../../helpers/axios-helper';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';
import dayjs from 'dayjs';

const EditCertificate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [certificate, setCertificate] = useState<FacilityCertification | null>(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    certificationName: Yup.string().required('Vui lòng nhập tên chứng chỉ'),
    imgs: Yup.array().min(1, 'Cần ít nhất một hình ảnh'),
    issueDate: Yup.date().required('Vui lòng nhập ngày cấp'),
    expiryDate: Yup.date().nullable(),
    certificationDetails: Yup.string().nullable(),
    statusApproval: Yup.mixed<StatusApproval>().required('Vui lòng chọn trạng thái')
  });

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        const response = await get(`/facility-certifications/${id}`);
        setCertificate(response.data);
      } catch (error) {
        console.error('Failed to fetch certificate:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCertificate();
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      certificationId: certificate?.certificationId || '',
      certificationName: certificate?.certificationName || '',
      imgs: certificate?.imgs || [],
      issueDate: dayjs(certificate?.issueDate ?? new Date()).format('YYYY-MM-DD'),
      expiryDate: dayjs(certificate?.expiryDate ?? new Date()).format('YYYY-MM-DD'),
      certificationDetails: certificate?.certificationDetails || '',
      createDate: certificate?.createDate || new Date(),
      updateDate: certificate?.updateDate || new Date(),
      statusApproval: certificate?.statusApproval || StatusApproval.Processing,
      replyRequest: certificate?.replyRequest || '',
      touristFacilityId: certificate?.touristFacilityId || '',
      touristFacility: certificate?.touristFacility || null
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await put(`/facility-certifications/${id}`, values);
        navigate(`${TOURISM_FACILITY_URLs.CERTIFICATES.DETAILS}?id=${id}`);
      } catch (error) {
        console.error('Failed to update certificate:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  if (loading) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(`${TOURISM_FACILITY_URLs.CERTIFICATES.DETAILS}?id=${id}`)}>
          Quay lại
        </Button>
        <Typography variant="h5">Chỉnh sửa chứng chỉ</Typography>
      </Stack>

      <Card>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} sx={{ p: 3 }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Hình ảnh chứng chỉ
              </Typography>
              <MultipleFileUploader values={formik.values.imgs} onChange={(urls) => formik.setFieldValue('imgs', urls)} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên chứng chỉ"
                name="certificationName"
                value={formik.values.certificationName}
                onChange={formik.handleChange}
                error={formik.touched.certificationName && Boolean(formik.errors.certificationName)}
                helperText={formik.touched.certificationName && formik.errors.certificationName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ngày cấp"
                type="date"
                name="issueDate"
                value={formik.values.issueDate}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                error={formik.touched.issueDate && Boolean(formik.errors.issueDate)}
                helperText={formik.touched.issueDate && formik.errors.issueDate}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ngày hết hạn"
                type="date"
                name="expiryDate"
                value={formik.values.expiryDate}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                helperText={formik.touched.expiryDate && formik.errors.expiryDate}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Chi tiết chứng chỉ"
                name="certificationDetails"
                value={formik.values.certificationDetails}
                onChange={formik.handleChange}
                error={formik.touched.certificationDetails && Boolean(formik.errors.certificationDetails)}
                helperText={formik.touched.certificationDetails && formik.errors.certificationDetails}
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton type="submit" variant="contained" loading={loading} startIcon={<SaveOutlined />}>
                Lưu thay đổi
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Stack>
  );
};

export default EditCertificate;
