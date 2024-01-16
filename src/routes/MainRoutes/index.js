import MainLayout from '~/layouts/MainLayout';
import CommonRoutes from './CommonRoutes';

const MainRoutes = () => {
  return {
    path: '/',
    element: <MainLayout />,
    children: CommonRoutes,
  };
};

export default MainRoutes;
