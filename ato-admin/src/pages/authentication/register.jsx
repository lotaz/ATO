import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthRegister from './auth-forms/AuthRegister';

// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Đăng ký</Typography>

            <Typography variant="caption" textAlign={'center'}>
              Vui lòng nhập đầy đủ thông tin để đăng ký tài khoản!
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
