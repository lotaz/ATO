import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { createBlog } from '../../../redux/blogSlice';
import { BlogCreateRequest, BlogType } from '../../../services/blog/types';
import { handleImageUpload } from '../../../utils/image-helper';

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const initialValues: BlogCreateRequest = {
    title: '',
    linkImg: '',
    description: '',
    content: '',
    blogType: BlogType.News
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Tiêu đề không được để trống'),
    description: Yup.string().required('Mô tả không được để trống'),
    content: Yup.string().required('Nội dung không được để trống'),
    linkImg: Yup.string().required('Ảnh không được để trống'),
    blogType: Yup.string().required('Loại tin tức không được để trống')
  });
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleImageUpload(
        file,
        (imageUrl) => {
          setFieldValue('linkImg', imageUrl);
        },
        (error) => {
          console.error('Image upload failed:', error);
        },
        (previewUrl) => {
          setPreviewImage(previewUrl);
        }
      );
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button variant="text" startIcon={<ArrowLeftOutlined />} onClick={() => navigate(CONTENT_MODERATOR_URLs.BLOG.INDEX)}>
          Quay lại
        </Button>
      </Stack>

      <AppCard>
        <Typography variant="h3" textAlign={'center'}>
          Tạo tin tức mới
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await dispatch(createBlog(values)).unwrap();
              setSubmitting(false);
              navigate(CONTENT_MODERATOR_URLs.BLOG.INDEX);
            } catch (error) {
              setSubmitting(false);
              console.error('Error creating blog:', error);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
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
                    {touched.linkImg && errors.linkImg && <FormHelperText error>{errors.linkImg}</FormHelperText>}
                    <Typography variant="caption" color="textSecondary">
                      Kích thước đề xuất: 1200x630px
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title">Tiêu đề</InputLabel>
                    <OutlinedInput
                      id="title"
                      type="text"
                      value={values.title}
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập tiêu đề"
                      fullWidth
                      error={Boolean(touched.title && errors.title)}
                    />
                    {touched.title && errors.title && <FormHelperText error>{errors.title}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="blogType">Loại tin tức</InputLabel>
                    <Select
                      id="blogType"
                      value={values.blogType}
                      name="blogType"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.blogType && errors.blogType)}
                    >
                      <MenuItem value={BlogType.News}>Tin tức</MenuItem>
                      <MenuItem value={BlogType.Even}>Sự kiện</MenuItem>
                    </Select>
                    {touched.blogType && errors.blogType && <FormHelperText error>{errors.blogType}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="description">Mô tả</InputLabel>
                    <OutlinedInput
                      id="description"
                      type="text"
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập mô tả"
                      fullWidth
                      multiline
                      rows={3}
                      error={Boolean(touched.description && errors.description)}
                    />
                    {touched.description && errors.description && <FormHelperText error>{errors.description}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="content">Nội dung</InputLabel>
                    <OutlinedInput
                      id="content"
                      type="text"
                      value={values.content}
                      name="content"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập nội dung"
                      fullWidth
                      multiline
                      rows={6}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && <FormHelperText error>{errors.content}</FormHelperText>}
                  </Stack>
                </Grid>

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
