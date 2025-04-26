import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import DrawerContent from './DrawerContent';
import DrawerHeader from './DrawerHeader';
import MiniDrawerStyled from './MiniDrawerStyled';

import { Theme } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { handlerDrawerOpen, useGetMenuMaster } from '../../../api/menu';
import { drawerWidth } from '../../../config';
import { AUTHEN_URLs } from '../../../constants/authen-url';
import authenSlice from '../../../redux/authenSlice';

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
