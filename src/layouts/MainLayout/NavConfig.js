import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

const navConfig = [
  {
    title: 'News',
    path: '/',
    icon: <FeedOutlinedIcon />,
  },
  {
    title: 'Video',
    path: '/videos',
    icon: <OndemandVideoOutlinedIcon />,
  },
  {
    title: 'Chatbot',
    path: '/chatbot',
    icon: <SmartToyOutlinedIcon />,
  },
];

export default navConfig;
