import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { RootState } from '../../../redux/store';
import { fetchProduct, updateProduct } from '../../../redux/tourism-facility/product.slice';
import { ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';

const validationSchema = Yup.object().shape({
  productName: Yup.string().required('Tên sản phẩm là bắt buộc'),
  productCategory: Yup.string().required('Danh mục là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  manufacturer: Yup.string().required('Nhà sản xuất là bắt buộc'),
  addressManufacturer: Yup.string().required('Địa chỉ nhà sản xuất là bắt buộc'),
  origin: Yup.string().required('Nguồn gốc là bắt buộc'),
  nutritionType: Yup.string(),
  age: Yup.string(),
  ingredient: Yup.string(),
  volume: Yup.string(),
  unitProduct: Yup.number().required('Số lượng là bắt buộc').min(0, 'Số lượng phải lớn hơn 0'),
  additional: Yup.string(),
  imgs: Yup.array().min(1, 'Cần ít nhất 1 ảnh')
});

const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const params = new URLSearchParams(location.search);
  const id = params.get('productId');
  const { product, loading } = useSelector((state: RootState) => state.productSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await dispatch(updateProduct({ id, data: values } as any)).unwrap();
      navigate(TOURISM_FACILITY_URLs.PRODUCT.INDEX);
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Cập nhật sản phẩm
        </Typography>

        <Formik initialValues={product} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên sản phẩm"
                    name="productName"
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.productName && Boolean(errors.productName)}
                    helperText={touched.productName && errors.productName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Danh mục"
                    name="productCategory"
                    value={values.productCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.productCategory && Boolean(errors.productCategory)}
                    helperText={touched.productCategory && errors.productCategory}
                  >
                    {Object.entries(ProductCategoryLabels).map(([value, label]) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Mô tả"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nhà sản xuất"
                    name="manufacturer"
                    value={values.manufacturer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.manufacturer && Boolean(errors.manufacturer)}
                    helperText={touched.manufacturer && errors.manufacturer}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Địa chỉ nhà sản xuất"
                    name="addressManufacturer"
                    value={values.addressManufacturer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.addressManufacturer && Boolean(errors.addressManufacturer)}
                    helperText={touched.addressManufacturer && errors.addressManufacturer}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nguồn gốc"
                    name="origin"
                    value={values.origin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.origin && Boolean(errors.origin)}
                    helperText={touched.origin && errors.origin}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Số lượng"
                    name="unitProduct"
                    value={values.unitProduct}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.unitProduct && Boolean(errors.unitProduct)}
                    helperText={touched.unitProduct && errors.unitProduct}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Loại dinh dưỡng"
                    name="nutritionType"
                    value={values.nutritionType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.nutritionType && Boolean(errors.nutritionType)}
                    helperText={touched.nutritionType && errors.nutritionType}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Độ tuổi"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Thành phần"
                    name="ingredient"
                    value={values.ingredient}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.ingredient && Boolean(errors.ingredient)}
                    helperText={touched.ingredient && errors.ingredient}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Khối lượng"
                    name="volume"
                    value={values.volume}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.volume && Boolean(errors.volume)}
                    helperText={touched.volume && errors.volume}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Thông tin thêm"
                    name="additional"
                    value={values.additional}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.additional && Boolean(errors.additional)}
                    helperText={touched.additional && errors.additional}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MultipleFileUploader values={values.imgs} onChange={(newImages) => setFieldValue('imgs', newImages)} />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => navigate(TOURISM_FACILITY_URLs.PRODUCT.INDEX)}>
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

export default UpdateProduct;
