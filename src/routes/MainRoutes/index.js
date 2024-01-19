import MainLayout from '~/layouts/MainLayout';
import CommonRoutes from './CommonRoutes';
import PageNotFound from '~/pages/PageNotFound';

const MainRoutes = () => {
  return {
    path: '/JobAskFE/',
    element: <MainLayout />,
    children: [
      ...CommonRoutes.map((route) => ({
        ...route,
        path: route.path ? `${route.path}` : '',
      })),
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  };
};

export default MainRoutes;
