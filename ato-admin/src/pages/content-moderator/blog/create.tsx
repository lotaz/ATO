import { Box, Button, Divider, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';

const CreateBlog = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const initialValues = {
    title: '',
    category: '',
    content: '',
    image: null,
    status: 'draft',
    submit: null
  };

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
      console.log('Đang tạo tin tức:', values);
      setSubmitting(false);
      navigate(ADMIN_URLs.NEWS.INDEX);
    } catch (error) {
      console.error('Lỗi khi tạo tin tức:', error);
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={2}>
      <AppCard variant="outlined">
        <Typography variant="h3" textAlign="center">
          Thêm mới tin tức
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string().max(255).required('Tiêu đề là bắt buộc'),
            category: Yup.string().required('Danh mục là bắt buộc'),
            content: Yup.string().required('Nội dung là bắt buộc'),
            image: Yup.mixed().required('Ảnh là bắt buộc')
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
                    {touched.image && errors.image && <FormHelperText error>{errors.image as string}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Thông tin cơ bản */}
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
                        Tạo mới
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

export default CreateBlog;
