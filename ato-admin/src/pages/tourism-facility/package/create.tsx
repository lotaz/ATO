import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { TimeType, StatusOperating } from '../../../types/tourism-facility/package.types';
import { packageService } from '../../../services/tourism-facility/package.service';

const CreatePackage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    packageName: Yup.string().required('Vui lòng nhập tên gói'),
    description: Yup.string().required('Vui lòng nhập mô tả'),
    price: Yup.number().min(0, 'Giá phải lớn hơn 0').required('Vui lòng nhập giá'),
    durations: Yup.number().min(0, 'Thời gian phải lớn hơn 0').required('Vui lòng nhập thời gian'),
    durationsType: Yup.number().required('Vui lòng chọn đơn vị thời gian'),
    statusOperating: Yup.number().required('Vui lòng chọn trạng thái hoạt động')
  });

  const formik = useFormik({
    initialValues: {
      packageName: '',
      description: '',
      price: 0,
      durations: 0,
      durationsType: TimeType.DAY,
      statusOperating: StatusOperating.ACTIVE
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await packageService.createPackage(values);
        navigate(TOURISM_FACILITY_URLs.PACKAGE.INDEX);
      } catch (error) {
        console.error('Failed to create package:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Thêm gói du lịch</Typography>
      </Stack>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="packageName"
                  label="Tên gói"
                  value={formik.values.packageName}
                  onChange={formik.handleChange}
                  error={formik.touched.packageName && Boolean(formik.errors.packageName)}
                  helperText={formik.touched.packageName && formik.errors.packageName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="Mô tả"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  name="price"
                  label="Giá"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  name="durations"
                  label="Thời gian"
                  value={formik.values.durations}
                  onChange={formik.handleChange}
                  error={formik.touched.durations && Boolean(formik.errors.durations)}
                  helperText={formik.touched.durations && formik.errors.durations}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  name="durationsType"
                  label="Đơn vị thời gian"
                  value={formik.values.durationsType}
                  onChange={formik.handleChange}
                  error={formik.touched.durationsType && Boolean(formik.errors.durationsType)}
                  helperText={formik.touched.durationsType && formik.errors.durationsType}
                >
                  <MenuItem value={TimeType.SECOND}>Giây</MenuItem>
                  <MenuItem value={TimeType.MINUTE}>Phút</MenuItem>
                  <MenuItem value={TimeType.HOUR}>Giờ</MenuItem>
                  <MenuItem value={TimeType.DAY}>Ngày</MenuItem>
                  <MenuItem value={TimeType.MONTH}>Tháng</MenuItem>
                  <MenuItem value={TimeType.YEAR}>Năm</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  name="statusOperating"
                  label="Trạng thái hoạt động"
                  value={formik.values.statusOperating}
                  onChange={formik.handleChange}
                  error={formik.touched.statusOperating && Boolean(formik.errors.statusOperating)}
                  helperText={formik.touched.statusOperating && formik.errors.statusOperating}
                >
                  <MenuItem value={StatusOperating.ACTIVE}>Hoạt động</MenuItem>
                  <MenuItem value={StatusOperating.INACTIVE}>Không hoạt động</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Card>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.INDEX)}>
              Hủy
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveOutlined />} disabled={formik.isSubmitting}>
              Lưu
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default CreatePackage;
