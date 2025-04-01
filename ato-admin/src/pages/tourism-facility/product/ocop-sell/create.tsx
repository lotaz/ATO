import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { createOCOPSell } from '../../../../redux/tourism-facility/ocop-sell.slice';

const CreateOCOPSell = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const params = new URLSearchParams(location.search);
  const productId = params.get('productId');

  const formik = useFormik({
    initialValues: {
      sellVolume: 0,
      salePrice: 0,
      manufacturingDate: null,
      expiryDate: null,
      productId: productId
    },
    validationSchema: Yup.object({
      sellVolume: Yup.number().required('Vui lòng nhập số lượng bán').min(1, 'Số lượng phải lớn hơn 0'),
      salePrice: Yup.number().required('Vui lòng nhập giá bán').min(0, 'Giá bán phải lớn hơn hoặc bằng 0'),
      manufacturingDate: Yup.date().nullable().required('Vui lòng chọn ngày sản xuất'),
      expiryDate: Yup.date().nullable().required('Vui lòng chọn ngày hết hạn')
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(createOCOPSell(values));
        navigate(`${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}?productId=${productId}`);
      } catch (error) {
        console.error('Failed to create OCOP sell:', error);
      }
    }
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}?productId=${productId}`)}
        >
          Trở về chi tiết sản phẩm
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Thêm đợt bán OCOP
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="sellVolume"
                  label="Số lượng bán"
                  type="number"
                  value={formik.values.sellVolume}
                  onChange={formik.handleChange}
                  error={formik.touched.sellVolume && Boolean(formik.errors.sellVolume)}
                  helperText={formik.touched.sellVolume && formik.errors.sellVolume}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="salePrice"
                  label="Giá bán"
                  type="number"
                  value={formik.values.salePrice}
                  onChange={formik.handleChange}
                  error={formik.touched.salePrice && Boolean(formik.errors.salePrice)}
                  helperText={formik.touched.salePrice && formik.errors.salePrice}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Ngày sản xuất"
                  value={formik.values.manufacturingDate}
                  onChange={(date) => formik.setFieldValue('manufacturingDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: formik.touched.manufacturingDate && Boolean(formik.errors.manufacturingDate),
                      helperText: formik.touched.manufacturingDate && formik.errors.manufacturingDate
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Ngày hết hạn"
                  value={formik.values.expiryDate}
                  onChange={(date) => formik.setFieldValue('expiryDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: formik.touched.expiryDate && Boolean(formik.errors.expiryDate),
                      helperText: formik.touched.expiryDate && formik.errors.expiryDate
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button variant="outlined" onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}?productId=${productId}`)}>
                    Hủy
                  </Button>
                  <Button type="submit" variant="contained">
                    Tạo đợt bán
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CreateOCOPSell;
