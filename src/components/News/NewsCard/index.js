import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box, Skeleton } from '@mui/material';
import useResponsive from '~/hooks/useResponsive';

const NewsCard = ({ title, description, url, urlToImage, publishedAt, loading }) => {
  const DateTime = (publishTime) => {
    const day = new Date(publishTime);
    return `${day.getDay()}/${day.getMonth()}/${day.getFullYear()}`;
  };

  const isPhone = useResponsive('down', 'sm');

  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea
        sx={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}
        component="a"
        href={url}
        target="_blank"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {loading ? (
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Skeleton variant="text" sx={{ fontSize: '1.125rem', lineHeight: '1.8' }} />
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', lineHeight: '1.5', display: { xs: 'none', sm: '-webkit-box' } }}
              />
              <Skeleton variant="text" sx={{ fontSize: '1rem', position: 'absolute', bottom: 1 }} width={150} />
            </CardContent>
          ) : (
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontWeight: 700,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.5,
                  display: { xs: 'none', sm: '-webkit-box' },
                }}
              >
                {description}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  position: 'absolute',
                  bottom: 1,
                }}
              >
                {DateTime(publishedAt)}
              </Typography>
            </CardContent>
          )}
        </Box>
        <Box sx={{ padding: 1 }}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: { xs: '92px', sm: '120px' }, height: { xs: '92px', sm: '120px' }, borderRadius: '10px' }}
            />
          ) : (
            <img
              src={urlToImage ?? require('~/assets/no-image.png')}
              alt=""
              style={{
                width: isPhone ? '92px' : '120px',
                height: isPhone ? '92px' : '120px',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
