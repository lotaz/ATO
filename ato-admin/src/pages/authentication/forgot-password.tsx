import { Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import AuthForgotPassword from './auth-forms/AuthForgotPassword';

const ForgotPassword = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <Typography variant="h3" textAlign="center">
              Quên mật khẩu
            </Typography>
            <Typography variant="caption" textAlign="center">
              Nhập tên đăng nhập của bạn để nhận hướng dẫn đặt lại mật khẩu
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
