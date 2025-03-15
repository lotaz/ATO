import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import AppCard from '../../../components/cards/AppCard';
import { RootState } from '../../../redux/store';
import { getEmailConfig, updateEmailConfig } from '../../../redux/emailConfigSlice';
import { IEmailConfig } from '../../../services/config/types';

const EmailConfig = () => {
  const dispatch = useDispatch<any>();
  const { config, loading } = useSelector((state: RootState) => state.emailConfig);

  useEffect(() => {
    dispatch(getEmailConfig());
  }, [dispatch]);

  const handleSubmit = async (values: IEmailConfig, { setSubmitting }: any) => {
    try {
      await dispatch(updateEmailConfig(values));
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: IEmailConfig = {
    email: config?.email || '',
    appPassword: config?.appPassword || ''
  };

  return (
    <Box width={'50%'} margin={'auto'}>
      <AppCard>
        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
          Cấu hình Email
        </Typography>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            appPassword: Yup.string().required('App Password là bắt buộc')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-config">Email</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-config"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ email"
                      autoComplete="off"
                      startAdornment={<MailOutlined />}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-config">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="app-password">App Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.appPassword && errors.appPassword)}
                      id="app-password"
                      type="password"
                      value={values.appPassword}
                      name="appPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Nhập App Password"
                      startAdornment={<LockOutlined />}
                    />
                    {touched.appPassword && errors.appPassword && (
                      <FormHelperText error id="helper-text-app-password">
                        {errors.appPassword}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Button disabled={loading} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {loading ? 'Đang lưu...' : 'Lưu cấu hình'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </AppCard>
    </Box>
  );
};

export default EmailConfig;
