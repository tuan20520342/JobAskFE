import { Box, Card, CardActionArea, CardContent, Skeleton, Typography } from '@mui/material';

const NewsCard = ({ title, description, url, urlToImage, publishedAt, loading }) => {
  const DateTime = (publishTime) => {
    const day = new Date(publishTime);
    return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea
        sx={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}
        component="a"
        href={url}
        target="_blank"
      >
        <Box>
          {loading ? (
            <Skeleton variant="rectangular" sx={{ height: 160, aspectRatio: 1 }} />
          ) : (
            <img
              src={urlToImage ?? require('~/assets/no-image.png')}
              alt=""
              style={{
                height: 160,
                aspectRatio: 1,
                objectFit: 'cover',
              }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {loading ? (
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Skeleton variant="text" sx={{ fontSize: '1.125rem', lineHeight: '1.8' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', lineHeight: '1.5', display: { xs: 'none', sm: '-webkit-box' } }}
              />
            </CardContent>
          ) : (
            <CardContent sx={{ flex: '1 0 auto', paddingTop: 2, paddingBottom: 2 }}>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  fontWeight: 700,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                  margin: 0,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                }}
              >
                {DateTime(publishedAt)}
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
            </CardContent>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
