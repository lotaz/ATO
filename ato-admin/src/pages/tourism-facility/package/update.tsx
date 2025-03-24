import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { packageService } from '../../../services/tourism-facility/package.service';
import { StatusOperating, TimeType, TourismPackageResponse } from '../../../types/tourism-facility/package.types';

const UpdatePackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [packageData, setPackageData] = useState<TourismPackageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPackage(id);
    }
  }, [id]);

  const fetchPackage = async (packageId: string) => {
    try {
      setIsLoading(true);
      const response = await packageService.getPackage(packageId);
      setPackageData(response.data);
    } catch (error) {
      console.error('Failed to fetch package:', error);
    } finally {
      setIsLoading(false);
    }
  };
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
      packageName: packageData?.packageName || '',
      description: packageData?.description || '',
      price: packageData?.price || 0,
      durations: packageData?.durations || 0,
      durationsType: packageData?.durationsType || TimeType.DAY,
      statusOperating: packageData?.statusOperating || StatusOperating.ACTIVE
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        if (id) {
          await packageService.updatePackage(id, values);
          navigate(TOURISM_FACILITY_URLs.PACKAGE.INDEX);
        }
      } catch (error) {
        console.error('Failed to update package:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  if (isLoading) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Cập nhật gói du lịch</Typography>
      </Stack>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên gói du lịch"
                  name="packageName"
                  value={formik.values.packageName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.packageName && Boolean(formik.errors.packageName)}
                  helperText={formik.touched.packageName && formik.errors.packageName}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Giá"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Thời gian"
                  name="durations"
                  value={formik.values.durations}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.durations && Boolean(formik.errors.durations)}
                  helperText={formik.touched.durations && formik.errors.durations}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Đơn vị thời gian"
                  name="durationsType"
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Mô tả"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Trạng thái hoạt động"
                  name="statusOperating"
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
            <LoadingButton variant="contained" type="submit" loading={formik.isSubmitting} startIcon={<SaveOutlined />}>
              Cập nhật
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default UpdatePackage;
