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
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 24,
        gap: 16,
      }}
    >
      <Helmet>
        <title>Video | JobAsk</title>
      </Helmet>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1000,
          top: 24,
        }}
      >
        <Box sx={{ width: '100%', position: 'relative' }}>
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
            height: 'calc(100vh-100px)',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gridColumnGap: 16,
            gridRowGap: 20,
            overflow: 'scroll',
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
