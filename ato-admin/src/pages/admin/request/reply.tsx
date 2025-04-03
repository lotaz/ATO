import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Chip, Divider, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';

interface RequestDetails {
  id: string;
  title: string;
  sender: string;
  date: string;
  content: string;
  status: 'pending' | 'replied' | 'closed';
  priority: 'high' | 'medium' | 'low';
}

const ReplyRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const requestDetails: RequestDetails = {
    id: '001',
    title: 'Yêu cầu hỗ trợ',
    sender: 'nguyen.van.a@company.com',
    date: '20/02/2024',
    content: 'Tôi cần được hỗ trợ về cài đặt tài khoản...',
    status: 'pending',
    priority: 'high'
  };

  const initialValues = {
    reply: '',
    status: 'replied',
    submit: null
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'replied':
        return 'success';
      case 'closed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      console.log('Đang gửi phản hồi:', values);
      setSubmitting(false);
      navigate(ADMIN_URLs.REQUEST.INDEX);
    } catch (error) {
      console.error('Lỗi khi gửi phản hồi:', error);
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(ADMIN_URLs.REQUEST.INDEX)} sx={{ width: 'fit-content' }}>
        Quay lại danh sách
      </Button>

      <AppCard>
        <Stack spacing={3}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h4">{requestDetails.title}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={requestDetails.status} color={getStatusColor(requestDetails.status)} size="small" />
                <Chip label={requestDetails.priority} color={getPriorityColor(requestDetails.priority)} size="small" />
              </Stack>
            </Stack>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Từ: {requestDetails.sender}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary" align="right">
                  Ngày: {requestDetails.date}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body1">{requestDetails.content}</Typography>
            </Box>
          </Box>

          <Divider />

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              reply: Yup.string().required('Vui lòng nhập nội dung phản hồi')
            })}
            onSubmit={handleSubmit}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="reply">Nội dung phản hồi</InputLabel>
                      <OutlinedInput
                        id="reply"
                        name="reply"
                        value={values.reply}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Nhập nội dung phản hồi..."
                        fullWidth
                        multiline
                        rows={6}
                        error={Boolean(touched.reply && errors.reply)}
                      />
                      {touched.reply && errors.reply && <FormHelperText error>{errors.reply}</FormHelperText>}
                    </Stack>
                  </Grid>

                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="outlined" color="secondary" onClick={() => navigate(ADMIN_URLs.REQUEST.INDEX)}>
                        Hủy
                      </Button>
                      <AnimateButton>
                        <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                          Gửi phản hồi
                        </Button>
                      </AnimateButton>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default ReplyRequest;
