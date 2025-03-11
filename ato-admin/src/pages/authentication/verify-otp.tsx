import { Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import AuthVerifyOTP from './auth-forms/AuthVerifyOTP';

const VerifyOTP = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <Typography variant="h3" textAlign="center">
              Xác thực OTP
            </Typography>
            <Typography variant="caption" textAlign="center">
              Nhập mã OTP đã được gửi đến email của bạn
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthVerifyOTP />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default VerifyOTP;
