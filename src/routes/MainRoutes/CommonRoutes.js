import NewsPage from '~/pages/NewsPage';
import VideoPage from '~/pages/VideoPage';
import ChatBotPage from '~/pages/ChatbotPage';
import PageNotFound from '~/pages/PageNotFound';
import CompanyPage from '~/pages/CompanyPage';

const CommonRoutes = [
  {
    path: '/news',
    element: <NewsPage />,
  },
  {
    path: '/videos',
    element: <VideoPage />,
  },
  {
    path: '/',
    element: <ChatBotPage />,
  },
  {
    path: '/company',
    element: <CompanyPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];

export default CommonRoutes;
