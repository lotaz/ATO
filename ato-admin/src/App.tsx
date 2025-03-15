import { RouterProvider } from 'react-router-dom';

// project import
import router from './routes';
import ThemeCustomization from './themes';

import ScrollTop from './components/ScrollTop';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
