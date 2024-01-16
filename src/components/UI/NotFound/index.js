import React from 'react';
import useResponsive from '~/hooks/useResponsive';

const NotFoundImg = ({ isWrong }) => {
  const isTablet = useResponsive('down', 'md');

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={isWrong ? require('~/assets/oops.png') : require('~/assets/404-not-found.png')}
        alt={'not-found'}
        style={{
          width: isTablet ? '80%' : '60%',
        }}
      />
    </div>
  );
};
export default NotFoundImg;
