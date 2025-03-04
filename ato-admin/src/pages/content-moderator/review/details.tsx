import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Box, Button, Chip, Divider, FormHelperText, InputLabel, OutlinedInput, Rating, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { Review } from './types';

const ReviewDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRejecting, setIsRejecting] = useState(false);

  // Mock data - thay thế bằng API call
  const reviewInfo: Review = {
    id: 'RV001',
    type: 'company',
    userId: 'U001',
    userName: 'Nguyễn Văn A',
    userEmail: 'nguyenvana@gmail.com',
    companyId: 'C001',
    companyName: 'Công ty Du lịch ABC',
    rating: 4,
    comment: 'Dịch vụ rất tốt, nhân viên nhiệt tình. Tuy nhiên giá hơi cao một chút.',
    createdAt: '20/02/2024',
    status: 'pending'
  };

  const handleApprove = async () => {
    try {
      // Thêm API call để duyệt đánh giá
      console.log('Duyệt đánh giá:', reviewInfo.id);
      navigate(CONTENT_MODERATOR_URLs.REVIEW.INDEX);
    } catch (error) {
      console.error('Lỗi khi duyệt đánh giá:', error);
    }
  };

  const handleReject = async (values: any, { setSubmitting }: any) => {
    try {
      // Thêm API call để từ chối đánh giá
      console.log('Từ chối đánh giá:', { reviewId: reviewInfo.id, reason: values.reason });
      setSubmitting(false);
      navigate(CONTENT_MODERATOR_URLs.REVIEW.INDEX);
    } catch (error) {
      console.error('Lỗi khi từ chối đánh giá:', error);
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Từ chối';
      case 'pending':
        return 'Chờ duyệt';
      default:
        return status;
    }
  };

  return (
    <Stack spacing={3}>
      <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(CONTENT_MODERATOR_URLs.REVIEW.INDEX)} sx={{ width: 'fit-content' }}>
        Quay lại danh sách
      </Button>

      <AppCard>
        <Stack spacing={3}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Chi tiết đánh giá</Typography>
            <Chip label={getStatusText(reviewInfo.status)} color={getStatusColor(reviewInfo.status)} />
          </Stack>

          <Divider />

          {/* Thông tin người đánh giá */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thông tin người đánh giá
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 64, height: 64 }}>{reviewInfo.userName[0]}</Avatar>
              <Stack spacing={0.5}>
                <Typography variant="h6">{reviewInfo.userName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {reviewInfo.userEmail}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ngày đánh giá: {reviewInfo.createdAt}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Nội dung đánh giá */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Nội dung đánh giá
            </Typography>
            <Stack spacing={2}>
              {reviewInfo.type === 'company' && <Typography variant="subtitle1">Đánh giá về: {reviewInfo.companyName}</Typography>}
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Đánh giá:</Typography>
                <Rating value={reviewInfo.rating} readOnly />
                <Typography>({reviewInfo.rating}/5)</Typography>
              </Stack>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {reviewInfo.comment}
              </Typography>
            </Stack>
          </Box>

          {reviewInfo.status === 'pending' && (
            <>
              <Divider />

              {/* Phê duyệt/Từ chối */}
              {!isRejecting ? (
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button variant="outlined" color="error" onClick={() => setIsRejecting(true)}>
                    Từ chối
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleApprove}>
                    Duyệt đánh giá
                  </Button>
                </Stack>
              ) : (
                <Box>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Lý do từ chối
                  </Typography>
                  <Formik
                    initialValues={{ reason: '' }}
                    validationSchema={Yup.object().shape({
                      reason: Yup.string().required('Vui lòng nhập lý do từ chối')
                    })}
                    onSubmit={handleReject}
                  >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                      <form noValidate onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="reason">Lý do</InputLabel>
                            <OutlinedInput
                              id="reason"
                              name="reason"
                              value={values.reason}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Nhập lý do từ chối đánh giá"
                              fullWidth
                              multiline
                              rows={3}
                              error={Boolean(touched.reason && errors.reason)}
                            />
                            {touched.reason && errors.reason && <FormHelperText error>{errors.reason}</FormHelperText>}
                          </Stack>
                          <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="outlined" color="secondary" onClick={() => setIsRejecting(false)}>
                              Hủy
                            </Button>
                            <AnimateButton>
                              <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="error">
                                Xác nhận từ chối
                              </Button>
                            </AnimateButton>
                          </Stack>
                        </Stack>
                      </form>
                    )}
                  </Formik>
                </Box>
              )}
            </>
          )}
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default ReviewDetails;
