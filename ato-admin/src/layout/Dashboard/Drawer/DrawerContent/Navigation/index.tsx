// material-ui
import Box from '@mui/material/Box';

// project import
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import adminMenu from '../../../../../menu-items/admin-menu';
import contentModeratorMenu from '../../../../../menu-items/content-moderator-menu';
import tourGuideMenu from '../../../../../menu-items/tour-guide-menu';
import tourCompanuMenu from '../../../../../menu-items/tourism-company-menu';
import tourismFacilityMenu from '../../../../../menu-items/tourism-facility-menu';
import { TMenu, TMenuGroup } from '../../../../../menu-items/types';
import { RootState } from '../../../../../redux/store';
import { Role } from '../../../../../types';
import NavGroup from './NavGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const [menuItems, setMenuItems] = useState<TMenuGroup | undefined>();

  const user: any = useSelector((state: RootState) => state.authen.user);

  useEffect(() => {
    if (user !== null) {
      switch (user?.role as Role) {
        case 'Admin':
          setMenuItems({ items: [adminMenu] });
          break;
        case 'TourGuides':
          setMenuItems({ items: [tourGuideMenu] });
          break;
        case 'AgriculturalTourismFacilityOwners':
          setMenuItems({ items: [tourismFacilityMenu] });
          break;
        case 'ContentModerators':
          setMenuItems({ items: [contentModeratorMenu] });
          break;
        case 'TourismCompanies':
          setMenuItems({ items: [tourCompanuMenu] });
          break;
      }
    }
  }, [user]);

  const navGroups = menuItems?.items.map((item: TMenu) => {
    return <NavGroup key={item.id} item={item} />;
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
