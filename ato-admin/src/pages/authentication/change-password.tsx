import { Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import AuthChangePassword from './auth-forms/AuthChangePassword';

const ChangePassword = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <Typography variant="h3" textAlign="center">
              Đổi mật khẩu
            </Typography>
            <Typography variant="caption" textAlign="center">
              Vui lòng nhập mật khẩu mới của bạn
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthChangePassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ChangePassword;
