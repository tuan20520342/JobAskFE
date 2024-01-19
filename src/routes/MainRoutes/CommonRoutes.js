import NewsPage from '~/pages/NewsPage';
import VideoPage from '~/pages/VideoPage';
import ChatBotPage from '~/pages/ChatbotPage';
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
    path: '',
    element: <ChatBotPage />,
  },
  {
    path: '/company',
    element: <CompanyPage />,
  },
];

export default CommonRoutes;
