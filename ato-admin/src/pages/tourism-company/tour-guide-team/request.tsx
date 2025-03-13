import { Typography } from '@mui/material';
import AppCard from '../../../components/cards/AppCard';
import CreateTourGuide from './create';

const RequestTourGuide = () => {
  return (
    <AppCard>
      <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
        Đăng Ký Làm Hướng Dẫn Viên
      </Typography>
      <CreateTourGuide isRequest />
    </AppCard>
  );
};

export default RequestTourGuide;
