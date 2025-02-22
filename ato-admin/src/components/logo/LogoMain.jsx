// material-ui
import { Typography } from '@mui/material';
import LogoImage from '../../assets/images/logo.png';

const Logo = () => {
  return (
    <>
      <img src={LogoImage} alt="logo" width={46} height={46} />
      <Typography color={'blue'} fontWeight={'bold'}>
        ATO
      </Typography>
    </>
  );
};

export default Logo;
