import { Box, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import VideoCard from '~/components/Video/VideoCard';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import ModalCustom from '~/HOC/ModalCustom';
import { modalActions } from '~/redux/reducer/ModalReducer';
import VideoModal from '~/components/Video/VideoModal';
import { Helmet } from 'react-helmet';
import NotFoundImg from '~/components/UI/NotFound';

const VideoPage = () => {
  const dispatch = useDispatch();
  const { listVideo } = useSelector((state) => state.videoSlice);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [keyword, setKeyWord] = useState('');
  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_VIDEO_SAGA,
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      fail: () => setError(true),
    });
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [listVideo]);

  const handleSearchVideo = () => {
    if (keyword.trim() !== '') {
      dispatch({
        type: SagaActionTypes.GET_VIDEO_SAGA,
        keyword: keyword.replace(/\s/g, '+'),
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
        fail: () => setError(true),
      });
    }
  };

  const handleOpenVideoModal = (id) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <VideoModal id={id} />,
      }),
    );
  };

  const handleEnterSearch = (key) => {
    if (key.key === 'Enter') {
      handleSearchVideo();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Helmet>
        <title>Video | Lapteller</title>
      </Helmet>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          position: 'fixed',
          padding: 2,
          left: 0,
          top: { xs: 55, sm: 63, md: 67 },
          justifyContent: 'center',
          zIndex: 1000,
        }}
        elevation={2}
      >
        <Box sx={{ width: '90%', maxWidth: 1000, minWidth: 200, position: 'relative' }}>
          <TextField
            inputProps={{ style: { fontWeight: 500 } }}
            variant="outlined"
            placeholder="Search"
            fullWidth
            color="secondary"
            onChange={(e) => setKeyWord(e.target.value)}
            onKeyDown={(key) => {
              handleEnterSearch(key);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="send button" edge="end" onClick={handleSearchVideo}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>
      {error ? (
        <NotFoundImg isWrong={true} />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            maxWidth: 1700,
            width: '100%',
            gridColumnGap: 10,
            gridRowGap: 20,
            marginTop: 100,
          }}
        >
          {loading
            ? Array.from({ length: 16 }).map((_, index) => <VideoCard key={index} loading={true} />)
            : listVideo.map((item) => (
                <VideoCard
                  key={item.id.videoId}
                  id={item.id.videoId}
                  title={item.snippet.title}
                  channel={item.snippet.channelTitle}
                  thumbnail={item.snippet.thumbnails.medium.url}
                  publishTime={item.snippet.publishTime}
                  onClick={handleOpenVideoModal}
                />
              ))}
        </div>
      )}

      <ModalCustom />
    </div>
  );
};
export default VideoPage;
