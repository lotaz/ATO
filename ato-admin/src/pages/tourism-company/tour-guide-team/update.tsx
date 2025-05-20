import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { FileUploader } from '../../../components/upload/FileUploader';
import { ListRole } from '../../../constants/role';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { getAccount, updateAccount } from '../../../redux/accountSlice';
import { RootState } from '../../../redux/store';
import { User } from '../../../types';

const UpdateAccount = () => {
  const navigate = useNavigate();

  const account = useSelector((state: RootState) => state.account.specific) as any as User;

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const accountId = params.get('id');
  const dispatch = useDispatch<any>();
  const [error, setError] = useState('');

  useEffect(() => {
    if (accountId !== null) dispatch(getAccount(accountId));
  }, [accountId]);

  const initialRole = ListRole.find((x) => x.name.replace(/\s/g, '') === account?.roleName)?.id;
  console.log('initialRole', account?.roleName);
  return (
    <Stack direction="column" justifyContent="space-between">
      <AppCard variant="outlined">
        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
          Chỉnh sửa thông tin người dùng
        </Typography>

        <Formik
          initialValues={{
            id: account?.id || '',
            userName: account?.userName || '',
            email: account?.email || '',
            phoneNumber: account?.phoneNumber || '',
            fullname: account?.fullname || '',
            gender: account?.gender || true,
            dob: account?.dob ? dayjs(account.dob) : null,
            isAccountActive: account?.isAccountActive ?? true,
            role: initialRole || '',
            avatarURL: account?.avatarURL || ''
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            userName: Yup.string().required('Tên đăng nhập là bắt buộc'),
            email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            phoneNumber: Yup.string()
              .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
              .required('Số điện thoại là bắt buộc'),
            fullname: Yup.string().required('Họ tên là bắt buộc'),
            role: Yup.string().required('Vai trò là bắt buộc'),
            dob: Yup.date().nullable().required('Ngày sinh là bắt buộc')
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await dispatch(
                updateAccount({
                  ...values,
                  dob: dayjs(values.dob).format('YYYY-MM-DD'),
                  phoneNumber: values.phoneNumber.replace(/\s/g, '')
                })
              ).unwrap();
              navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX);
            } catch (err: any) {
              setError(err.message || 'Có lỗi xảy ra');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Thông tin cơ bản */}

                <Grid item xs={12}>
                  <Stack spacing={1} alignItems={'center'}>
                    <InputLabel>Ảnh đại diện</InputLabel>
                    <FileUploader value={values.avatarURL} onChange={(url) => setFieldValue('avatarURL', url)} accept="image/*" />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {/* Username field */}
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="userName">Tên đăng nhập*</InputLabel>
                        <OutlinedInput
                          id="userName"
                          name="userName"
                          value={values.userName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập tên đăng nhập"
                          fullWidth
                          error={Boolean(touched.userName && errors.userName)}
                        />
                        {touched.userName && errors.userName && <FormHelperText error>{errors.userName}</FormHelperText>}
                      </Stack>
                    </Grid>
                    {/* Date of Birth field */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Ngày sinh*</InputLabel>
                        <DatePicker
                          value={values.dob}
                          onChange={(date) => setFieldValue('dob', date)}
                          slotProps={{
                            textField: {
                              error: Boolean(touched.dob && errors.dob),
                              helperText: touched.dob && errors.dob
                            }
                          }}
                        />
                      </Stack>
                    </Grid>
                    {/* Existing fields with corrected names */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="fullname">Họ và tên*</InputLabel>
                        <OutlinedInput
                          id="fullname"
                          name="fullname"
                          value={values.fullname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập họ và tên"
                          fullWidth
                          error={Boolean(touched.fullname && errors.fullname)}
                        />
                        {touched.fullname && errors.fullname && <FormHelperText error>{errors.fullname}</FormHelperText>}
                      </Stack>
                    </Grid>
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
                        <InputLabel htmlFor="phoneNumber">Số điện thoại*</InputLabel>
                        <OutlinedInput
                          id="phoneNumber"
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập số điện thoại"
                          fullWidth
                          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                        />
                        {touched.phoneNumber && errors.phoneNumber && <FormHelperText error>{errors.phoneNumber}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Giới tính</InputLabel>
                        <RadioGroup row name="gender" value={values.gender} onChange={handleChange}>
                          <FormControlLabel value="true" control={<Radio />} label="Nam" />
                          <FormControlLabel value="false" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                      </Stack>
                    </Grid>{' '}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Trạng thái tài khoản</InputLabel>
                        <FormControl>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Switch
                              checked={values.isAccountActive}
                              onChange={(e) => setFieldValue('isAccountActive', e.target.checked)}
                              name="isAccountActive"
                            />
                            <Typography>{values.isAccountActive ? 'Đang hoạt động' : 'Đã khóa'}</Typography>
                          </Stack>
                        </FormControl>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                  </Grid>
                </Grid>

                {/* Buttons */}
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" color="secondary" onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX)}>
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
