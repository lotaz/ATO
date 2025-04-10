import { Button, FormHelperText, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AppCard from '../../../components/cards/AppCard';
import { UserSelect } from '../../../components/select/UserSelect';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tour-guide';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface CreateTourGuideProps {
  initialValues?: TourGuideResponse;
  isUpdate?: boolean;
  isRequest?: boolean;
}

const CreateTourGuide = ({ initialValues, isUpdate, isRequest }: CreateTourGuideProps) => {
  const navigate = useNavigate();

  return (
    <AppCard>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX)}>
          Quay lại
        </Button>
        <Typography variant="h3">
          {isRequest ? 'Đăng Ký Làm Hướng Dẫn Viên' : isUpdate ? 'Cập Nhật Hướng Dẫn Viên' : 'Thêm Hướng Dẫn Viên'}
        </Typography>
        <div style={{ width: 100 }} /> {/* Spacer to balance the layout */}
      </Stack>

      <Formik
        initialValues={{
          userId: initialValues?.userId || 0,
          companyId: initialValues?.tourCompanyId || 0,
          bio: initialValues?.bio || '',
          languages: initialValues?.languages || [],
          expertiseArea: initialValues?.expertiseArea || [],
          submit: null
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.number().min(1, 'Vui lòng chọn người dùng'),
          bio: Yup.string().required('Vui lòng nhập giới thiệu'),
          languages: Yup.array().min(1, 'Chọn ít nhất một ngôn ngữ'),
          expertiseArea: Yup.array().min(1, 'Chọn ít nhất một lĩnh vực chuyên môn')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (isUpdate && initialValues?.guideId) {
              await tourGuideService.updateTourGuide(initialValues.guideId, values);
            } else {
              await tourGuideService.createTourGuide(values);
            }
            setSubmitting(false);
            navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX);
          } catch (err) {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Người dùng</InputLabel>
                  <UserSelect
                    value={values.userId.toString()}
                    onChange={(value) => setFieldValue('userId', value)}
                    error={Boolean(touched.userId && errors.userId)}
                  />
                  {touched.userId && errors.userId && <FormHelperText error>{errors.userId}</FormHelperText>}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Giới thiệu</InputLabel>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    error={Boolean(touched.bio && errors.bio)}
                    value={values.bio}
                    name="bio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập giới thiệu"
                  />
                  {touched.bio && errors.bio && <FormHelperText error>{errors.bio}</FormHelperText>}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Ngôn ngữ</InputLabel>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    error={Boolean(touched.languages && errors.languages)}
                    value={values.languages}
                    name="bio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập ngôn ngữ"
                  />
                  {touched.languages && errors.languages && <FormHelperText error>{errors.languages}</FormHelperText>}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Lĩnh vực chuyên môn</InputLabel>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    error={Boolean(touched.expertiseArea && errors.expertiseArea)}
                    value={values.expertiseArea}
                    name="bio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập chuyên môn"
                  />
                  {touched.expertiseArea && errors.expertiseArea && <FormHelperText error>{errors.expertiseArea}</FormHelperText>}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                  {isRequest ? 'Gửi yêu cầu' : isUpdate ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </AppCard>
  );
};

export default CreateTourGuide;
