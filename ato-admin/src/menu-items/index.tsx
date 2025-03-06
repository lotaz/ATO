// project import
import adminMenu from './admin-menu';
import authentication from './authentication';
import contentModeratorMenu from './content-moderator-menu';
import tourGuideMenu from './tour-guide-menu';
import tourCompanuMenu from './tourism-company-menu';
import tourismFacilityMenu from './tourism-facility-menu';
import { TMenuGroup } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: TMenuGroup = {
  items: [adminMenu, contentModeratorMenu, tourGuideMenu, tourCompanuMenu, tourismFacilityMenu, authentication]
};

export default menuItems;
