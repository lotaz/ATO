// material-ui
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import MobileSection from './MobileSection';
import Profile from './Profile';

// project import

export default function HeaderContent() {
  const downLG = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  return (
    <>
      {<Box sx={{ width: '100%', ml: 1 }} />}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
