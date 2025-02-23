import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { TStrengthColorResponse } from '../../../utils/types';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [level, setLevel] = useState<TStrengthColorResponse>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const changePassword = (value: any) => {
    const temp: number = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        onSubmit={() => {}}
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          company: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('Nhập tên đầy đủ'),
          email: Yup.string().email('Nhập email chính xác').max(255).required('Nhập email'),
          password: Yup.string().max(255).required('Nhập mật khẩu')
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Họ và tên*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    inputProps={{}}
                  />
                </Stack>
                {touched.lastname && errors.lastname && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.lastname}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Mật khẩu</InputLabel>
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
                      changePassword(e.target.value);
                    }}
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
                    placeholder="Nhập mật khẩu"
                    inputProps={{}}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
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
                <Typography variant="body2">
                  Bằng cách đăng ký bạn đồng ý với &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Điều khoản
                  </Link>
                  &nbsp; và &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Chính sách bảo mật
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Đăng ký
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Stack direction={'row'} spacing={3} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant="body1" sx={{ textDecoration: 'none' }}>
                    Đã có tài khoản?
                  </Typography>
                  <Typography
                    component={RouterLink}
                    to="/login"
                    variant="body1"
                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                    color="primary"
                  >
                    Đăng nhập
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
