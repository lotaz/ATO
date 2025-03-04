import { CameraOutlined } from '@ant-design/icons';
import { Box, Button, Divider, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';

const UpdateCompany = () => {
  const initialValues = {
    name: 'Công ty Du lịch ABC',
    foundedDate: '2010/01/01',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    email: 'contact@abctravel.com',
    phone: '02812345678',
    status: 'active',
    description: 'Công ty chuyên tổ chức các tour du lịch trong và ngoài nước...',
    website: 'www.abctravel.com',
    taxCode: '0123456789',
    representative: 'Nguyễn Văn A',
    representativePosition: 'Giám đốc',
    businessType: 'TNHH',
    employeeCount: '50-100',
    image: 'https://caodang.fpt.edu.vn/wp-content/uploads/2024/05/Artboard-3.png'
  };

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState(initialValues.image);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    setSubmitting(false);
    navigate(ADMIN_URLs.COMPANY.INDEX);
  };

  return (
    <Stack direction="column" justifyContent="space-between">
      <AppCard variant="outlined">
        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
          Chỉnh sửa thông tin công ty
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Tên công ty là bắt buộc'),
            businessType: Yup.string().required('Loại hình doanh nghiệp là bắt buộc'),
            taxCode: Yup.string().required('Mã số thuế là bắt buộc'),
            email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            phone: Yup.string()
              .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
              .required('Số điện thoại là bắt buộc'),
            address: Yup.string().required('Địa chỉ là bắt buộc'),
            representative: Yup.string().required('Tên người đại diện là bắt buộc')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: 200,
                        height: 200,
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover .overlay': {
                          opacity: 1
                        }
                      }}
                      onClick={handleImageClick}
                    >
                      <img
                        src={previewImage}
                        alt="Company Logo"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <Box
                        className="overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s'
                        }}
                      >
                        <Stack spacing={1} alignItems="center">
                          <CameraOutlined style={{ fontSize: '2rem', color: 'white' }} />
                          <Typography color="white" variant="body2">
                            Thay đổi ảnh
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        handleImageChange(e);
                        const file = e.target.files?.[0];
                        if (file) {
                          setFieldValue('image', file);
                        }
                      }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Nhấp vào ảnh để thay đổi (Kích thước đề xuất: 800x600px)
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Thông tin cơ bản
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">Tên công ty*</InputLabel>
                        <OutlinedInput
                          id="name"
                          name="name"
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập tên công ty"
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                        />
                        {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="businessType">Loại hình doanh nghiệp*</InputLabel>
                        <Select
                          id="businessType"
                          name="businessType"
                          value={values.businessType}
                          onChange={handleChange}
                          fullWidth
                          error={Boolean(touched.businessType && errors.businessType)}
                        >
                          <MenuItem value="TNHH">Công ty TNHH</MenuItem>
                          <MenuItem value="CP">Công ty Cổ phần</MenuItem>
                          <MenuItem value="DNTN">Doanh nghiệp tư nhân</MenuItem>
                        </Select>
                        {touched.businessType && errors.businessType && <FormHelperText error>{errors.businessType}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="taxCode">Mã số thuế*</InputLabel>
                        <OutlinedInput
                          id="taxCode"
                          name="taxCode"
                          value={values.taxCode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập mã số thuế"
                          fullWidth
                          error={Boolean(touched.taxCode && errors.taxCode)}
                        />
                        {touched.taxCode && errors.taxCode && <FormHelperText error>{errors.taxCode}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="foundedDate">Ngày thành lập</InputLabel>
                        <OutlinedInput
                          id="foundedDate"
                          name="foundedDate"
                          type="date"
                          value={values.foundedDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="website">Website</InputLabel>
                        <OutlinedInput
                          id="website"
                          name="website"
                          value={values.website}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập website"
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="status">Trạng thái</InputLabel>
                        <Select id="status" name="status" value={values.status} onChange={handleChange} fullWidth>
                          <MenuItem value="active">Đang hoạt động</MenuItem>
                          <MenuItem value="inactive">Không hoạt động</MenuItem>
                          <MenuItem value="pending">Chờ xác nhận</MenuItem>
                        </Select>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Thông tin liên hệ
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email">Email*</InputLabel>
                        <OutlinedInput
                          id="email"
                          name="email"
                          type="email"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập email"
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="phone">Số điện thoại*</InputLabel>
                        <OutlinedInput
                          id="phone"
                          name="phone"
                          value={values.phone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập số điện thoại"
                          fullWidth
                          error={Boolean(touched.phone && errors.phone)}
                        />
                        {touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="address">Địa chỉ*</InputLabel>
                        <OutlinedInput
                          id="address"
                          name="address"
                          value={values.address}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập địa chỉ"
                          fullWidth
                          multiline
                          rows={3}
                          error={Boolean(touched.address && errors.address)}
                        />
                        {touched.address && errors.address && <FormHelperText error>{errors.address}</FormHelperText>}
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Thông tin người đại diện
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="representative">Họ và tên*</InputLabel>
                        <OutlinedInput
                          id="representative"
                          name="representative"
                          value={values.representative}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập họ và tên người đại diện"
                          fullWidth
                          error={Boolean(touched.representative && errors.representative)}
                        />
                        {touched.representative && errors.representative && <FormHelperText error>{errors.representative}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="representativePosition">Chức vụ</InputLabel>
                        <OutlinedInput
                          id="representativePosition"
                          name="representativePosition"
                          value={values.representativePosition}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập chức vụ"
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Thông tin bổ sung
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="employeeCount">Quy mô nhân sự</InputLabel>
                        <Select id="employeeCount" name="employeeCount" value={values.employeeCount} onChange={handleChange} fullWidth>
                          <MenuItem value="<10">Dưới 10 người</MenuItem>
                          <MenuItem value="10-50">10-50 người</MenuItem>
                          <MenuItem value="50-100">50-100 người</MenuItem>
                          <MenuItem value="100-500">100-500 người</MenuItem>
                          <MenuItem value=">500">Trên 500 người</MenuItem>
                        </Select>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="description">Mô tả</InputLabel>
                        <OutlinedInput
                          id="description"
                          name="description"
                          value={values.description}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập mô tả về công ty"
                          fullWidth
                          multiline
                          rows={4}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" color="secondary" onClick={() => navigate(ADMIN_URLs.COMPANY.INDEX)}>
                      Hủy
                    </Button>
                    <AnimateButton>
                      <Button type="submit" variant="contained" color="primary">
                        Lưu thay đổi
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

export default UpdateCompany;
