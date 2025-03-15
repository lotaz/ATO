import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Grid, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { createProduct } from '../../../redux/tourism-facility/product.slice';
import { ProductCategory, ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';

const validationSchema = Yup.object().shape({
  productName: Yup.string().required('Product name is required'),
  imgs: Yup.array().min(1, 'At least one image is required'),
  price: Yup.number().required('Price is required').min(0, 'Price must be positive').typeError('Price must be a number'),
  description: Yup.string().required('Description is required'),
  manufacturer: Yup.string().required('Manufacturer is required'),
  addressManufacturer: Yup.string().required('Manufacturer address is required'),
  unitProduct: Yup.number()
    .required('Unit product is required')
    .min(0, 'Unit product must be positive')
    .typeError('Unit product must be a number'),
  productCategory: Yup.number().required('Product category is required').typeError('Product category must be a number')
});

const initialValues = {
  productName: '',
  imgs: [],
  price: '',
  description: '',
  additional: '',
  nutritionType: '',
  age: '',
  ingredient: '',
  volume: '',
  origin: '',
  manufacturer: '',
  addressManufacturer: '',
  unitProduct: '',
  productCategory: ProductCategory.Food // Set default category
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
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
        <Typography variant="h5" gutterBottom>
          Create New Product
        </Typography>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MultipleFileUploader values={values.imgs} onChange={(urls) => setFieldValue('imgs', urls)} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="productName"
                    label="Product Name"
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
                    label="Product Category"
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
                    label="Unit Product"
                    type="number"
                    value={values.unitProduct}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.unitProduct && Boolean(errors.unitProduct)}
                    helperText={touched.unitProduct && errors.unitProduct}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="price"
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="description"
                    label="Description"
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
                    name="manufacturer"
                    label="Manufacturer"
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
                    label="Manufacturer Address"
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
                    name="nutritionType"
                    label="Nutrition Type"
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
                    label="Age"
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
                    label="Ingredient"
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
                    label="Volume"
                    value={values.volume}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="origin"
                    label="Origin"
                    value={values.origin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="additional"
                    label="Additional Information"
                    value={values.additional}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => navigate(TOURISM_FACILITY_URLs.PRODUCT.INDEX)}>
                      Cancel
                    </Button>
                    <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                      Create Product
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
