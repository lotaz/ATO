import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Divider, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - thay thế bằng API call sau
  const initialValues = {
    title: 'Du lịch Hạ Long mùa thu - Khám phá vẻ đẹp thiên nhiên kỳ vĩ',
    category: 'domestic',
    content: `Vịnh Hạ Long mùa thu mang một vẻ đẹp khác biệt với nắng dịu, gió mát và những hòn đảo được bao phủ trong sương sớm mờ ảo. 
    Đây là thời điểm lý tưởng để du khách có thể tận hưởng những trải nghiệm tuyệt vời nhất tại di sản thiên nhiên thế giới này.

    Trong bài viết này, chúng tôi sẽ chia sẻ những điểm đến không thể bỏ qua, các hoạt động thú vị và những lưu ý quan trọng khi du lịch Hạ Long vào mùa thu...`,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592',
    status: 'published',
    tags: ['Du lịch', 'Hạ Long', 'Mùa thu', 'Khám phá'],
    submit: null
  };

  const [previewImage, setPreviewImage] = useState(initialValues.image);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFieldValue('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Thêm API call ở đây
      console.log('Cập nhật tin tức:', values);
      setSubmitting(false);
      navigate(ADMIN_URLs.NEWS.INDEX);
    } catch (error) {
      console.error('Lỗi khi cập nhật tin tức:', error);
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(CONTENT_MODERATOR_URLs.BLOG.INDEX)} sx={{ width: 'fit-content' }}>
        Quay lại danh sách
      </Button>

      <AppCard>
        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
          Cập nhật tin tức
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string().max(255).required('Tiêu đề là bắt buộc'),
            category: Yup.string().required('Danh mục là bắt buộc'),
            content: Yup.string().required('Nội dung là bắt buộc')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Ảnh tin tức */}
                <Grid item xs={12}>
                  <Stack spacing={1} alignItems="center">
                    <Box
                      onClick={handleImageClick}
                      sx={{
                        width: '100%',
                        height: 300,
                        border: '2px dashed #ccc',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        '&:hover': {
                          borderColor: 'primary.main'
                        }
                      }}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <Typography color="textSecondary">Nhấp để tải ảnh lên</Typography>
                      )}
                    </Box>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Kích thước đề xuất: 1200x630px
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Thông tin bài viết */}
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Thông tin bài viết
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title">Tiêu đề*</InputLabel>
                        <OutlinedInput
                          id="title"
                          name="title"
                          value={values.title}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập tiêu đề bài viết"
                          fullWidth
                          error={Boolean(touched.title && errors.title)}
                        />
                        {touched.title && errors.title && <FormHelperText error>{errors.title}</FormHelperText>}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="category">Danh mục*</InputLabel>
                        <Select
                          id="category"
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          fullWidth
                          error={Boolean(touched.category && errors.category)}
                        >
                          <MenuItem value="domestic">Du lịch trong nước</MenuItem>
                          <MenuItem value="international">Du lịch nước ngoài</MenuItem>
                          <MenuItem value="food">Ẩm thực</MenuItem>
                          <MenuItem value="culture">Văn hóa</MenuItem>
                          <MenuItem value="experience">Kinh nghiệm</MenuItem>
                        </Select>
                        {touched.category && errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="status">Trạng thái</InputLabel>
                        <Select id="status" name="status" value={values.status} onChange={handleChange} fullWidth>
                          <MenuItem value="draft">Bản nháp</MenuItem>
                          <MenuItem value="published">Xuất bản</MenuItem>
                          <MenuItem value="archived">Lưu trữ</MenuItem>
                        </Select>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="content">Nội dung*</InputLabel>
                        <OutlinedInput
                          id="content"
                          name="content"
                          value={values.content}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập nội dung bài viết"
                          fullWidth
                          multiline
                          rows={10}
                          error={Boolean(touched.content && errors.content)}
                        />
                        {touched.content && errors.content && <FormHelperText error>{errors.content}</FormHelperText>}
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Buttons */}
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" color="secondary" onClick={() => navigate(CONTENT_MODERATOR_URLs.BLOG.INDEX)}>
                      Hủy
                    </Button>
                    <AnimateButton>
                      <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                        Cập nhật
                      </Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </AppCard>
    </Stack>
  );
};

export default UpdateBlog;
