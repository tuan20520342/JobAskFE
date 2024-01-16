import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import YouTube from 'react-youtube';

const VideoModal = ({ id }) => {
  const aspectRatio = 16 / 9;

  const calculateHeight = () => {
    return Math.floor((window.innerWidth * 0.7) / aspectRatio);
  };

  const [opts, setOpts] = useState({
    width: '100%',
    height: calculateHeight(),
    playerVars: {
      autoplay: 1,
    },
  });

  const containerStyle = {
    height: calculateHeight() - 1,
    background: 'transparent',
  };

  useEffect(() => {
    const handleResize = () => {
      setOpts({
        ...opts,
        height: calculateHeight(),
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [opts]);

  return (
    <div style={{ backgroundColor: 'black' }}>
      <YouTube style={containerStyle} videoId={id} opts={opts} />
    </div>
  );
};

export default VideoModal;
