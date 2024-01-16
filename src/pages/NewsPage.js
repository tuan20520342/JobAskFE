import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from '~/components/News/NewsCard';
import * as SagaActionTypes from '~/redux/constants';
import { Helmet } from 'react-helmet';
import NotFoundImg from '~/components/UI/NotFound';

const NewsPage = () => {
  const dispatch = useDispatch();
  const { listNews } = useSelector((state) => state.newsSlice);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_NEWS_SAGA,
      callback: () => setLoading(false),
      fail: () => setError(true),
    });
  }, [dispatch]);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Helmet>
        <title>News | Lapteller</title>
      </Helmet>
      {error ? (
        <NotFoundImg isWrong={true} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: loading ? 'center' : 'start',
            flexDirection: 'column',
            gap: '10px',
            height: '100%',
            width: '100%',
            maxWidth: '1000px',
            minWidth: '200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '10px',
          }}
        >
          {loading
            ? Array.from({ length: 10 }).map((_, index) => <NewsCard key={index} loading={true} />)
            : listNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  urlToImage={item.urlToImage}
                  publishedAt={item.publishedAt}
                ></NewsCard>
              ))}
        </Box>
      )}
    </div>
  );
};
export default NewsPage;
