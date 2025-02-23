// project import
import adminMenu from './admin-menu';
import authentication from './authentication';
import { TMenuGroup } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: TMenuGroup = {
  items: [adminMenu, authentication]
};

export default menuItems;
