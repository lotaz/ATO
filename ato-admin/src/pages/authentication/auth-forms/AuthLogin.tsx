import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';

// assets
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../../redux/authenSlice';
import { RootState } from '../../../redux/store';
import { ISignInRequest } from '../../../services/authen/types';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authen.user);

  useEffect(() => {
    console.log('user', user);
    if (user !== null) navigate('/');
  }, [user]);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch<any>();

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleSubmit = (e: ISignInRequest) => dispatch(signin({ username: e.username, password: e.password }));

  return (
    <>
      <Formik
        onSubmit={(e) => handleSubmit(e)}
        initialValues={
          {
            username: '',
            password: ''
          } as ISignInRequest
        }
        validationSchema={Yup.object<ISignInRequest>().shape({
          username: Yup.string().max(50).required('Nhập tên đăng nhập'),
          password: Yup.string().max(255).required('Nhập mật khẩu')
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Tên đăng nhập</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="text"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên đăng nhập"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                </Stack>
                {touched.username && errors.username && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Nhớ mật khẩu</Typography>}
                  />
                  <Link to={''} variant="h6" component={RouterLink} color="text.primary">
                    Quên mật khẩu?
                  </Link>
                </Stack>
              </Grid>
              {errors.username && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.username}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Đăng nhập
                  </Button>
                </AnimateButton>
              </Grid>

              <Grid item xs={12}>
                <Stack direction={'row'} spacing={3} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant="body1" sx={{ textDecoration: 'none' }}>
                    Bạn không có tài khoản?
                  </Typography>
                  <Typography
                    component={RouterLink}
                    to="/register"
                    variant="body1"
                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                    color="primary"
                  >
                    Tạo tài khoản
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

AuthLogin.propTypes = { isDemo: PropTypes.bool };
