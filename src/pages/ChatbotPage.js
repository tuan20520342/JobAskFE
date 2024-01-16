import { Box, FormControlLabel, IconButton, InputAdornment, Paper, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chat from '~/components/Chatbot/Chat';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '~/redux/reducer/ModalReducer';
import * as SagaActionTypes from '~/redux/constants';
import ModalCustom from '~/HOC/ModalCustom';
import ProductModel from '~/components/Products/ProductModel';
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

  const onClickProduct = (product) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <ProductModel product={product} />,
      }),
    );
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Helmet>
        <title>Chatbot | Lapteller</title>
      </Helmet>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '10px',
          height: '100%',
          width: '100%',
          maxWidth: '1020px',
          minWidth: '200px',
          marginBottom: !imageSearch ? '120px' : '190px',
          backgroundColor: 'white',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '10px',
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://i.imgur.com/2JK3Ex8.png)',
          backgroundSize: '40%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {listChat.map((item, index) => (
          <Chat key={index} content={item.content} isAnswer={item.isAnswer} onClick={onClickProduct}></Chat>
        ))}
        {loading && <Chat loading={true} isAnswer={true}></Chat>}
      </Paper>

      <Paper
        elevation={4}
        sx={{
          width: '100%',
          display: 'flex',
          gap: 1,
          position: 'fixed',
          bottom: 0,
          left: 0,
          padding: '8px 8px 16px 8px',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '90%', maxWidth: 1000, minWidth: 200, position: 'relative' }}>
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
      </Paper>
      <ModalCustom closeButton={true} custom={{ maxWidth: '1500px', minWidth: '200px' }} />
    </div>
  );
};

export default ChatBotPage;
