import { Box, FormControlLabel, IconButton, InputAdornment, Paper, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chat from '~/components/Chatbot/Chat';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '~/redux/reducer/ModalReducer';
import * as SagaActionTypes from '~/redux/constants';
import ModalCustom from '~/HOC/ModalCustom';
import JobModel from '~/components/Jobs/JobModel';
import { Helmet } from 'react-helmet';

const ChatBotPage = () => {
  const dispatch = useDispatch();
  const { listChat } = useSelector((state) => state.chatbotSlice);
  const [loading, setLoading] = useState(false);
  const [imageSearch, setImageSearch] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    // Scroll the entire page to the bottom when a new message is added
    window.scrollTo(0, document.body.scrollHeight);
  }, [listChat]);

  const toggleimageSearch = () => {
    setImageSearch((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (imageSearch) {
      if (newMessage.trim() !== '' && urlImage.trim() !== '') {
        dispatch({
          type: SagaActionTypes.SEND_IMG_MESSAGE_SAGA,
          message: newMessage,
          imageUrl: urlImage,
          onLoading: () => setLoading(true),
          onFinish: () => setLoading(false),
        });
        setNewMessage('');
        setUrlImage('');
      }
    } else {
      if (newMessage.trim() !== '') {
        dispatch({
          type: SagaActionTypes.SEND_MESSAGE_SAGA,
          message: newMessage,
          onLoading: () => setLoading(true),
          onFinish: () => setLoading(false),
        });
        setNewMessage('');
      }
    }
  };

  const handleEnterMesage = (key) => {
    if (key.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  const onClickProduct = (job) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <JobModel job={job} />,
      }),
    );
  };

  const onRelativeClick = (topic) => {
    if (topic.trim() !== '') {
      dispatch({
        type: SagaActionTypes.SEND_MESSAGE_SAGA,
        message: topic,
        onLoading: () => setLoading(true),
        onFinish: () => setLoading(false),
      });
    }
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
      }}
    >
      <Helmet>
        <title>Chatbot | JobAsk</title>
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '10px',
          flexGrow: 1,
          flexShrink: 0,
          width: '100%',
          backgroundColor: 'white',
          backgroundImage:
            listChat.length > 0
              ? ''
              : 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Line-style-icons-chat.svg/2560px-Line-style-icons-chat.svg.png)',
          backgroundSize: '20%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: 0,
        }}
      >
        {listChat.map((item, index) => (
          <Chat
            key={index}
            content={item.content}
            isAnswer={item.isAnswer}
            onClick={onClickProduct}
            onRelativeClick={onRelativeClick}
          ></Chat>
        ))}
        {loading && <Chat loading={true} isAnswer={true}></Chat>}
      </Box>

      <Box sx={{ width: '100%', position: 'relative' }}>
        <FormControlLabel
          value="top"
          control={<Switch color="primary" checked={imageSearch} onChange={toggleimageSearch} />}
          label="Image Search"
        />
        {imageSearch && (
          <TextField
            sx={{ marginBottom: 1 }}
            inputProps={{ style: { fontWeight: 500 }, autoComplete: 'off' }}
            variant="outlined"
            placeholder="URL image"
            fullWidth
            color="secondary"
            value={urlImage}
            onChange={(e) => setUrlImage(e.target.value)}
            onKeyDown={(key) => {
              handleEnterMesage(key);
            }}
          />
        )}
        <TextField
          inputProps={{ style: { fontWeight: 500 }, autoComplete: 'off' }}
          variant="outlined"
          placeholder="Send a message"
          fullWidth
          color="secondary"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(key) => {
            handleEnterMesage(key);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="send button" disabled={loading} onClick={handleSendMessage} edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <ModalCustom closeButton={true} custom={{ maxWidth: '1500px', minWidth: '200px' }} />
    </div>
  );
};

export default ChatBotPage;
