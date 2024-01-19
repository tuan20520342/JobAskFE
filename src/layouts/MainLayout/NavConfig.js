import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

const navConfig = [
  {
    title: 'Chatbot',
    path: '/',
    icon: <SmartToyOutlinedIcon />,
  },
  {
    title: 'News',
    path: '/news',
    icon: <FeedOutlinedIcon />,
  },
  {
    title: 'Video',
    path: '/videos',
    icon: <OndemandVideoOutlinedIcon />,
  },
];

export default navConfig;
