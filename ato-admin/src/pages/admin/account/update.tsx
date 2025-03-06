import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';

const UpdateAccount = () => {
  const navigate = useNavigate();
  // Mock data - replace with API call later
  const initialValues = {
    fullName: 'Nguyễn Văn A',
    role: 'admin',
    gender: 'male',
    status: 'active',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    company: 'Công ty TNHH ABC',
    submit: null
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    // Add API call here
    setSubmitting(false);
    navigate(ADMIN_URLs.ACCOUNT.INDEX);
  };
  return (
    <Stack direction="column" justifyContent="space-between">
      <AppCard variant="outlined">
        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
          Chỉnh sửa thông tin người dùng
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            fullName: Yup.string().max(255).required('Họ và tên là bắt buộc'),
            role: Yup.string().required('Vai trò là bắt buộc'),
            email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            phone: Yup.string()
              .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
              .required('Số điện thoại là bắt buộc'),
            address: Yup.string().required('Địa chỉ là bắt buộc'),
            company: Yup.string().required('Đơn vị là bắt buộc')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Thông tin cơ bản */}
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="fullName">Họ và tên*</InputLabel>
                        <OutlinedInput
                          id="fullName"
                          name="fullName"
                          value={values.fullName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập họ và tên"
                          fullWidth
                          error={Boolean(touched.fullName && errors.fullName)}
                        />
                        {touched.fullName && errors.fullName && <FormHelperText error>{errors.fullName}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email">Email*</InputLabel>
                        <OutlinedInput
                          id="email"
                          type="email"
                          name="email"
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
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Giới tính</InputLabel>
                        <RadioGroup row name="gender" value={values.gender} onChange={handleChange}>
                          <FormControlLabel value="male" control={<Radio />} label="Nam" />
                          <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Thông tin công việc */}
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="company">Đơn vị*</InputLabel>
                        <OutlinedInput
                          id="company"
                          name="company"
                          value={values.company}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập tên đơn vị"
                          fullWidth
                          error={Boolean(touched.company && errors.company)}
                        />
                        {touched.company && errors.company && <FormHelperText error>{errors.company}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="role">Vai trò*</InputLabel>
                        <Select
                          id="role"
                          name="role"
                          value={values.role}
                          onChange={handleChange}
                          error={Boolean(touched.role && errors.role)}
                          fullWidth
                        >
                          <MenuItem value="admin">Quản trị viên</MenuItem>
                          <MenuItem value="user">Người dùng</MenuItem>
                          <MenuItem value="editor">Biên tập viên</MenuItem>
                        </Select>
                        {touched.role && errors.role && <FormHelperText error>{errors.role}</FormHelperText>}
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

                {/* Địa chỉ */}
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

                {/* Buttons */}
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" color="secondary" onClick={() => navigate(ADMIN_URLs.ACCOUNT.INDEX)}>
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

export default UpdateAccount;
