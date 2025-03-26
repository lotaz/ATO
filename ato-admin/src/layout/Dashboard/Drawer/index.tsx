import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';

import { drawerWidth } from '../../../config';
import { handlerDrawerOpen, useGetMenuMaster } from '../../../api/menu';
import { Theme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTHEN_URLs } from '../../../constants/authen-url';
import authenSlice from '../../../redux/authenSlice';
import { enqueueSnackbar } from 'notistack';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

export default function MainDrawer({ window }: any) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { signOut } = authenSlice.actions;

  const { pathname } = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      dispatch(signOut());
      navigate(AUTHEN_URLs.LOGIN);
    }
  }, [pathname]);

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={!!drawerOpen} />, [drawerOpen]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderRightColor: 'divider',
              backgroundImage: 'none',
              boxShadow: 'inherit'
            }
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}

MainDrawer.propTypes = { window: PropTypes.func };
