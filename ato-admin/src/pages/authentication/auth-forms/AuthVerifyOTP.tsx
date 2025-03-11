import { LockOutlined } from '@ant-design/icons';
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { verifyOTP, resetVerifyOTP } from '../../../redux/authenSlice';
import { RootState } from '../../../redux/store';
import { AUTHEN_URLs } from '../../../constants/authen-url';

const AuthVerifyOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { verifyOTPStatus } = useSelector((state: RootState) => state.authen);

  useEffect(() => {
    return () => {
      dispatch(resetVerifyOTP());
    };
  }, [dispatch]);

  useEffect(() => {
    if (verifyOTPStatus === 'succeeded') {
      navigate(AUTHEN_URLs.CHANGE_PASSWORD);
    }
  }, [verifyOTPStatus, navigate]);

  return (
    <Formik
      initialValues={{
        otp: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        otp: Yup.string().length(6, 'Mã OTP phải có 6 ký tự').required('Vui lòng nhập mã OTP')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await dispatch(verifyOTP(values.otp));
          setSubmitting(false);
          // After successful verification, redirect to reset password page
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
                <InputLabel htmlFor="otp-code">Mã OTP</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.otp && errors.otp)}
                  id="otp-code"
                  type="text"
                  value={values.otp}
                  name="otp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập mã OTP"
                  startAdornment={<LockOutlined />}
                />
                {touched.otp && errors.otp && (
                  <FormHelperText error id="helper-text-otp-code">
                    {errors.otp}
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
                  disabled={verifyOTPStatus === 'loading'}
                >
                  {verifyOTPStatus === 'loading' ? 'Đang xác thực...' : 'Xác nhận'}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthVerifyOTP;
