import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

export default function Routes() {
  const NewMainRoutes = MainRoutes();
  return useRoutes([NewMainRoutes]);
}
