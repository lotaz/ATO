import { useState } from 'react';
import {
  FormHelperText,
  Grid,
  Box,
  Button,
  Stack,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';

const CreateAccount = () => {
  const [gender, setGender] = useState('male');

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Stack direction="column" justifyContent="space-between">
      <AppCard variant="outlined">
        <Typography component="h4" variant="h3" textAlign={'center'} sx={{ width: '100%', mb: 3 }}>
          Thêm mới người dùng
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Formik
            initialValues={{
              fullName: '',
              role: '',
              gender: 'male',
              status: 'active',
              address: '',
              email: '',
              phone: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              fullName: Yup.string().max(255).required('Họ và tên là bắt buộc'),
              role: Yup.string().required('Vai trò là bắt buộc'),
              address: Yup.string().max(255).required('Địa chỉ là bắt buộc'),
              email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
              phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
                .required('Số điện thoại là bắt buộc')
            })}
            onSubmit={handleSubmit}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Họ và tên & Vai trò */}
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="fullName">Họ và tên*</InputLabel>
                          <OutlinedInput
                            id="fullName"
                            type="text"
                            value={values.fullName}
                            name="fullName"
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
                          <InputLabel htmlFor="role">Vai trò*</InputLabel>
                          <Select
                            id="role"
                            value={values.role}
                            name="role"
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
                    </Grid>
                  </Grid>

                  {/* Email & Số điện thoại */}
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="email">Email*</InputLabel>
                          <OutlinedInput
                            id="email"
                            type="email"
                            value={values.email}
                            name="email"
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
                            type="tel"
                            value={values.phone}
                            name="phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                            fullWidth
                            error={Boolean(touched.phone && errors.phone)}
                          />
                          {touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Giới tính & Trạng thái */}
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel id="status-label">Trạng thái</InputLabel>
                          <Select labelId="status-label" id="status" value={values.status} name="status" onChange={handleChange} fullWidth>
                            <MenuItem value="active">Đang hoạt động</MenuItem>
                            <MenuItem value="inactive">Không hoạt động</MenuItem>
                            <MenuItem value="pending">Chờ xác nhận</MenuItem>
                          </Select>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel id="gender-label">Giới tính</InputLabel>
                          <FormControl>
                            <RadioGroup row name="gender" value={values.gender} onChange={handleChange}>
                              <FormControlLabel value="male" control={<Radio />} label="Nam" />
                              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                            </RadioGroup>
                          </FormControl>
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
                        type="text"
                        value={values.address}
                        name="address"
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

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                        Tạo mới
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </AppCard>
    </Stack>
  );
};

export default CreateAccount;
