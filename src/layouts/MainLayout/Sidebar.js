import { Box, Drawer, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '~/assets/robot.png';
import Scrollbar from '~/components/UI/Scrollbar';
import useResponsive from '~/hooks/useResponsive';
import NavSection from '~/layouts/MainLayout/NavSection';
import navConfig from './NavConfig';

const DRAWER_WIDTH = 300;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const Sidebar = ({ isOpenSidebar, onCloseSidebar }) => {
  const { pathname } = useLocation();
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Link
        to="/JobAskFe/"
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
          color: theme.palette.primary.main,
          padding: 24,
        }}
      >
        <Box component="img" src={logo} sx={{ height: 40, objectFit: 'contain' }} />
        <span style={{ textDecoration: 'none' }}>JobAsk</span>
      </Link>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};

export default Sidebar;
