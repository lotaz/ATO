// material-ui
import Box from '@mui/material/Box';

// project import
import menuItem from '../../../../../menu-items';
import NavGroup from './NavGroup';
import { TMenu } from '../../../../../menu-items/types';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const navGroups = menuItem.items.map((item: TMenu) => {
    return <NavGroup key={item.id} item={item} />;
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
