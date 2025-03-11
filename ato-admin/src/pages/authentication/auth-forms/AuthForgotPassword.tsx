import { MailOutlined } from '@ant-design/icons';
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { forgotPassword, resetForgotPassword, setUsername } from '../../../redux/authenSlice';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { AUTHEN_URLs } from '../../../constants/authen-url';

const AuthForgotPassword = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { forgotPasswordStatus } = useSelector((state: RootState) => state.authen);

  useEffect(() => {
    return () => {
      dispatch(resetForgotPassword());
    };
  }, [dispatch]);

  useEffect(() => {
    if (forgotPasswordStatus === 'succeeded') {
      navigate(AUTHEN_URLs.VERIFY_OTP);
    }
  }, [forgotPasswordStatus, navigate]);

  return (
    <Formik
      initialValues={{
        email: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().max(255).required('Nhập tên đăng nhập')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          dispatch(setUsername(values.email));
          await dispatch(forgotPassword(values.email));
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
                <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-forgot"
                  type="text"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập tên đăng nhập"
                  startAdornment={<MailOutlined />}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-forgot">
                    {errors.email}
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
                  disabled={forgotPasswordStatus === 'loading'}
                >
                  {forgotPasswordStatus === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu'}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthForgotPassword;
