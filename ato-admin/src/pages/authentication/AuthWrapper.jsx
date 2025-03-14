import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';

// project import
import AuthCard from './AuthCard';
import LogoSection from '../../components/logo';
import { Box } from '@mui/material';

// assets

export default function AuthWrapper({ children }) {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
      >
        <Grid item>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <LogoSection />
          </Box>
          <AuthCard>{children}</AuthCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
