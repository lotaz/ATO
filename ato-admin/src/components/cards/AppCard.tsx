import { styled } from '@mui/material';
import MuiCard from '@mui/material/Card';

const AppCard = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto'
}));

export default AppCard;
