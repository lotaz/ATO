import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardContent, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { createProduct } from '../../../redux/tourism-facility/product.slice';
import { ProductCategory, ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';
import { TCreateProduct } from '../../../types/tourism-facility/product.types';

const validationSchema = Yup.object().shape({
  productName: Yup.string().required('Product name is required'),
  imgs: Yup.array().min(1, 'At least one image is required'),
  description: Yup.string().required('Description is required'),
  manufacturer: Yup.string().required('Manufacturer is required'),
  addressManufacturer: Yup.string().required('Manufacturer address is required'),
  unitProduct: Yup.number()
    .required('Unit product is required')
    .min(0, 'Unit product must be positive')
    .typeError('Unit product must be a number'),
  productCategory: Yup.number().required('Product category is required').typeError('Product category must be a number')
});


const initialValues: TCreateProduct = {
  productName: '',
  imgs: [],
  description: '',
  additional: '',
  nutritionType: '',
  age: '',
  ingredient: '',
  volume: '',
  origin: '',
  manufacturer: '',
  addressManufacturer: '',
  unitProduct: 0,
  productCategory: ProductCategory.Food // Set default category
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleSubmit = async (values: TCreateProduct, { setSubmitting }: any) => {
    console.log('here');
    try {
      console.log('here');
      await dispatch(createProduct(values)).unwrap();
      navigate(TOURISM_FACILITY_URLs.PRODUCT.INDEX);
    } catch (error) {
      console.error('Failed to create product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" textAlign={'center'} gutterBottom>
          Tạo mới sản phẩm
        </Typography>

        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Product Images */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Hình ảnh sản phẩm
                  </Typography>
                  <MultipleFileUploader values={values.imgs} onChange={(urls) => setFieldValue('imgs', urls)} />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Thông tin cơ bản
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="productName"
                    label="Tên sản phẩm"
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.productName && Boolean(errors.productName)}
                    helperText={touched.productName && errors.productName}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    name="productCategory"
                    label="Danh mục"
                    value={values.productCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.productCategory && Boolean(errors.productCategory)}
                    helperText={touched.productCategory && errors.productCategory}
                    InputLabelProps={{ shrink: true }}
                  >
                    {Object.entries(ProductCategoryLabels).map(([value, label]) => (
                      <MenuItem key={value} value={Number(value)}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="unitProduct"
                    label="Số lượng"
                    type="number"
                    value={values.unitProduct}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.unitProduct && Boolean(errors.unitProduct)}
                    helperText={touched.unitProduct && errors.unitProduct}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Manufacturer Information */}
                <Grid item xs={12}>
                  <Divider />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Thông tin nhà sản xuất
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="manufacturer"
                    label="Nhà sản xuất"
                    value={values.manufacturer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.manufacturer && Boolean(errors.manufacturer)}
                    helperText={touched.manufacturer && errors.manufacturer}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="addressManufacturer"
                    label="Địa chỉ nhà sản xuất"
                    value={values.addressManufacturer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.addressManufacturer && Boolean(errors.addressManufacturer)}
                    helperText={touched.addressManufacturer && errors.addressManufacturer}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="origin"
                    label="Nguồn gốc"
                    value={values.origin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={12}>
                  <Divider />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Chi tiết sản phẩm
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="description"
                    label="Mô tả"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="nutritionType"
                    label="Loại dinh dưỡng"
                    value={values.nutritionType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="age"
                    label="Tuổi"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="ingredient"
                    label="Thành phần"
                    value={values.ingredient}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="volume"
                    label="Khối lượng"
                    value={values.volume}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="additional"
                    label="Thông tin thêm"
                    value={values.additional}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => navigate(TOURISM_FACILITY_URLs.PRODUCT.INDEX)}>
                      Hủy
                    </Button>
                    <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                      Tạo sản phẩm
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

export default CreateProduct;
