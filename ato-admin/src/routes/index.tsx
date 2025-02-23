import { createBrowserRouter } from 'react-router-dom';

// project import
import AdminRoutes from './AdminRoutes';
import AuthenRoutes from './AuthenRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([AuthenRoutes, AdminRoutes], { basename: '/' });

export default router;
