import { NavLink as RouterLink } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const AppBarItem = ({ item, active }) => {
  const theme = useTheme();
  const { title, path } = item;
  const activeStyle = {
    color: 'primary.darkbrown',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.dark, theme.palette.action.selectedOpacity),
  };

  return (
    <Button
      component={RouterLink}
      to={path}
      sx={{ my: 2, px: 2, color: 'white', display: 'block', ...(active && activeStyle) }}
    >
      {title}
    </Button>
  );
};

export default AppBarItem;
