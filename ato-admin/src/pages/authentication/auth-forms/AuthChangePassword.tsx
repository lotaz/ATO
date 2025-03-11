import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { AUTHEN_URLs } from '../../../constants/authen-url';
import { changePassword } from '../../../redux/authenSlice';
import { RootState } from '../../../redux/store';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';
import { enqueueSnackbar } from 'notistack';
import { isEmpty } from 'lodash';

const AuthChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [level, setLevel] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { changePasswordStatus, username } = useSelector((state: RootState) => state.authen);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const changePasswordStrength = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePasswordStrength('');
  }, []);

  useEffect(() => {
    if (isEmpty(username)) {
      navigate(AUTHEN_URLs.FORGOT_PASSWORD);
      enqueueSnackbar('Hãy nhập tên đăng nhập để nhận mã OTP', {
        variant: 'error'
      });
    }
  }, [username]);

  useEffect(() => {
    if (changePasswordStatus === 'succeeded') {
      navigate(AUTHEN_URLs.LOGIN);
    }
  }, [changePasswordStatus, navigate]);

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required('Vui lòng nhập mật khẩu'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
          .required('Vui lòng xác nhận mật khẩu')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await dispatch(changePassword({ password: values.password, username: username!, confirmPassword: values.confirmPassword }));
          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-signup">Mật khẩu mới</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-signup"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePasswordStrength(e.target.value);
                  }}
                  startAdornment={<LockOutlined />}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Nhập mật khẩu mới"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="confirm-password-signup">Xác nhận mật khẩu</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  id="confirm-password-signup"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  startAdornment={<LockOutlined />}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Xác nhận mật khẩu mới"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText error id="helper-text-confirm-password-signup">
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={changePasswordStatus === 'loading'}
                >
                  {changePasswordStatus === 'loading' ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthChangePassword;
