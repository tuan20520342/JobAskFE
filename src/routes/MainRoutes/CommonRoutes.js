import NewsPage from '~/pages/NewsPage';
import VideoPage from '~/pages/VideoPage';
import ChatBotPage from '~/pages/ChatbotPage';
import PageNotFound from '~/pages/PageNotFound';
import StorePage from '~/pages/StorePage';

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
    path: '/store',
    element: <StorePage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];

export default CommonRoutes;
