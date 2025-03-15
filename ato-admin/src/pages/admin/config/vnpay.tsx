import { SaveOutlined } from '@ant-design/icons';
import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { getVNPayConfig, updateVNPayConfig } from '../../../redux/vnpaySlice';
import { RootState } from '../../../redux/store';
import { UpdateVNPayConfigRequest } from '../../../services/vnpay/types';

const VNPayConfig = () => {
  const dispatch = useDispatch<any>();
  const config = useSelector((state: RootState) => state.vnpay.config);

  useEffect(() => {
    dispatch(getVNPayConfig());
  }, [dispatch]);

  const initialValues: UpdateVNPayConfigRequest = {
    tmnCode: config?.tmnCode || '',
    hashSecret: config?.hashSecret || '',
    url: config?.url || '',
    command: config?.command || '',
    currCode: config?.currCode || '',
    version: config?.version || '',
    locale: config?.locale || '',
    paymentBackReturnUrl: config?.paymentBackReturnUrl || ''
  };

  return (
    <Stack spacing={3}>
      <AppCard>
        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
          Cấu hình VNPay
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            tmnCode: Yup.string().required('TMN Code là bắt buộc'),
            hashSecret: Yup.string().required('Hash Secret là bắt buộc'),
            url: Yup.string().url('URL không hợp lệ').required('URL là bắt buộc'),
            command: Yup.string().required('Command là bắt buộc'),
            currCode: Yup.string().required('Currency Code là bắt buộc'),
            version: Yup.string().required('Version là bắt buộc'),
            locale: Yup.string().required('Locale là bắt buộc'),
            paymentBackReturnUrl: Yup.string().url('URL không hợp lệ').required('Return URL là bắt buộc')
          })}
          onSubmit={async (values: UpdateVNPayConfigRequest, { setSubmitting }) => {
            try {
              await dispatch(updateVNPayConfig(values));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="tmnCode">TMN Code*</InputLabel>
                    <OutlinedInput
                      id="tmnCode"
                      name="tmnCode"
                      value={values.tmnCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập TMN Code"
                      fullWidth
                      error={Boolean(touched.tmnCode && errors.tmnCode)}
                    />
                    {touched.tmnCode && errors.tmnCode && <FormHelperText error>{errors.tmnCode}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="hashSecret">Hash Secret*</InputLabel>
                    <OutlinedInput
                      id="hashSecret"
                      type="password"
                      name="hashSecret"
                      value={values.hashSecret}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập Hash Secret"
                      fullWidth
                      error={Boolean(touched.hashSecret && errors.hashSecret)}
                    />
                    {touched.hashSecret && errors.hashSecret && <FormHelperText error>{errors.hashSecret}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="url">URL*</InputLabel>
                    <OutlinedInput
                      id="url"
                      name="url"
                      value={values.url}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập URL"
                      fullWidth
                      error={Boolean(touched.url && errors.url)}
                    />
                    {touched.url && errors.url && <FormHelperText error>{errors.url}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="command">Command*</InputLabel>
                    <OutlinedInput
                      id="command"
                      name="command"
                      value={values.command}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập Command"
                      fullWidth
                      error={Boolean(touched.command && errors.command)}
                    />
                    {touched.command && errors.command && <FormHelperText error>{errors.command}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="currCode">Currency Code*</InputLabel>
                    <OutlinedInput
                      id="currCode"
                      name="currCode"
                      value={values.currCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập Currency Code"
                      fullWidth
                      error={Boolean(touched.currCode && errors.currCode)}
                    />
                    {touched.currCode && errors.currCode && <FormHelperText error>{errors.currCode}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="version">Version*</InputLabel>
                    <OutlinedInput
                      id="version"
                      name="version"
                      value={values.version}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập Version"
                      fullWidth
                      error={Boolean(touched.version && errors.version)}
                    />
                    {touched.version && errors.version && <FormHelperText error>{errors.version}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="locale">Locale*</InputLabel>
                    <OutlinedInput
                      id="locale"
                      name="locale"
                      value={values.locale}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập Locale"
                      fullWidth
                      error={Boolean(touched.locale && errors.locale)}
                    />
                    {touched.locale && errors.locale && <FormHelperText error>{errors.locale}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="paymentBackReturnUrl">Return URL*</InputLabel>
                    <OutlinedInput
                      id="paymentBackReturnUrl"
                      name="paymentBackReturnUrl"
                      value={values.paymentBackReturnUrl}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập Return URL"
                      fullWidth
                      error={Boolean(touched.paymentBackReturnUrl && errors.paymentBackReturnUrl)}
                    />
                    {touched.paymentBackReturnUrl && errors.paymentBackReturnUrl && (
                      <FormHelperText error>{errors.paymentBackReturnUrl}</FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AnimateButton>
                      <Button type="submit" variant="contained" startIcon={<SaveOutlined />}>
                        Lưu cấu hình
                      </Button>
                    </AnimateButton>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </AppCard>
    </Stack>
  );
};

export default VNPayConfig;
