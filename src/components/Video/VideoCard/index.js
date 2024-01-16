import React from 'react';
import { CardContent, CardMedia, Typography, Tooltip, CardActionArea, Box, Skeleton } from '@mui/material';

const VideoCard = ({ id, title, channel, thumbnail, publishTime, onClick, loading }) => {
  function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  const DateTime = (publishTime) => {
    const day = new Date(publishTime);
    return `${day.getDay()}/${day.getMonth()}/${day.getFullYear()}`;
  };

  const handleClick = () => {
    if (!loading) {
      onClick(id);
    }
  };

  return (
    <Box sx={{ bgcolor: 'transparent' }}>
      <CardActionArea sx={{ borderRadius: 1, overflow: 'hidden' }} onClick={handleClick}>
        {loading ? (
          <Skeleton
            sx={{
              aspectRatio: '16/9',
            }}
            variant="rectangular"
            width={'100%'}
            height={'100%'}
          />
        ) : (
          <CardMedia
            sx={{
              aspectRatio: '16/9',
            }}
            image={thumbnail}
            title=""
          />
        )}
        {loading ? (
          <CardContent>
            <Skeleton
              variant="text"
              sx={{ fontSize: '1.125rem', lineHeight: '1.5', marginBottom: '8px' }}
              animation="wave"
            />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'60%'} animation="wave" />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'60%'} animation="wave" />
          </CardContent>
        ) : (
          <CardContent>
            <Tooltip title={decodeHTMLEntities(title)}>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.5,
                }}
              >
                {decodeHTMLEntities(title)}
              </Typography>
            </Tooltip>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
              }}
              noWrap
            >
              {channel}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
              }}
            >
              {DateTime(publishTime)}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Box>
  );
};

export default VideoCard;
