import {
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { getAccount } from '../../../redux/accountSlice';
import { RootState } from '../../../redux/store';
import { User } from '../../../types';

const UpdateAccount = () => {
  const navigate = useNavigate();

  const account: User = useSelector((state: RootState) => state.account.specific);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const accountId = params.get('id');
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (accountId !== null) dispatch(getAccount(accountId));
  }, [accountId]);

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
          initialValues={account}
          validationSchema={Yup.object().shape({
            fullname: Yup.string().max(255).required('Họ và tên là bắt buộc'),
            roleName: Yup.string().required('Vai trò là bắt buộc'),
            email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            phoneNumber: Yup.string()
              .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
              .required('Số điện thoại là bắt buộc')
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
                          <FormControlLabel value="male" control={<Radio />} label="Nam" />
                          <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                      </Stack>
                    </Grid>
                  </Grid>
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
