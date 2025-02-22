import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3" textAlign={'center'}>
              Đăng nhập
            </Typography>
            <Typography variant="caption" textAlign={'center'}>
              Vui lòng nhập tên đăng nhập và mật khẩu để đăng nhập!
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
