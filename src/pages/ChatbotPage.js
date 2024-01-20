import styled from '@emotion/styled';
import AbcIcon from '@mui/icons-material/Abc';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import ModalCustom from '~/HOC/ModalCustom';
import Chat from '~/components/Chatbot/Chat';
import JobModel from '~/components/Jobs/JobModel';
import * as SagaActionTypes from '~/redux/constants';
import { modalActions } from '~/redux/reducer/ModalReducer';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ChatBotPage = () => {
  const dispatch = useDispatch();
  const { listChat } = useSelector((state) => state.chatbotSlice);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [listChat]);

  const handleSendMessage = () => {
    if (inputType === 'image') {
      dispatch({
        type: SagaActionTypes.SEND_IMG_MESSAGE_SAGA,
        message: 'Image',
        image: image,
        onLoading: () => setLoading(true),
        onFinish: () => setLoading(false),
      });
      setMessage('');
      setImage(null);
    } else {
      dispatch({
        type: SagaActionTypes.SEND_MESSAGE_SAGA,
        message: message,
        onLoading: () => setLoading(true),
        onFinish: () => setLoading(false),
      });
      setMessage('');
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const [inputType, setInputType] = React.useState('text');

  const handleChangeInputType = (event, newAlignment) => {
    setInputType(newAlignment);
  };
  console.log(listChat);
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
        {listChat.map((item, index) => {
          return (
            item && (
              <Chat
                key={index}
                content={item.content}
                isAnswer={item.isAnswer}
                onClick={onClickProduct}
                onRelativeClick={onRelativeClick}
              ></Chat>
            )
          );
        })}
        {loading && <Chat loading={true} isAnswer={true}></Chat>}
      </Box>

      <Box sx={{ width: '100%', position: 'relative', display: 'flex', gap: 2 }}>
        <ToggleButtonGroup value={inputType} exclusive onChange={handleChangeInputType}>
          <ToggleButton value="text" aria-label="left aligned">
            <AbcIcon />
          </ToggleButton>
          <ToggleButton value="image" aria-label="centered">
            <ImageIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        {inputType === 'text' ? (
          <TextField
            inputProps={{ style: { fontWeight: 500 }, autoComplete: 'off' }}
            variant="outlined"
            placeholder="Send a message"
            fullWidth
            color="secondary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(key) => {
              handleEnterMesage(key);
            }}
          />
        ) : (
          <Box sx={{ flex: 1 }}>
            {image ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '50px' }} />
                <Button
                  variant="text"
                  disabled={loading}
                  onClick={() => {
                    setImage(null);
                  }}
                  style={{ flexShrink: 0, height: '50px' }}
                  color="error"
                >
                  <CloseIcon />
                </Button>
              </Box>
            ) : (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ height: '50px' }}
              >
                Upload image
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
              </Button>
            )}
          </Box>
        )}
        <Button
          variant="text"
          disabled={
            loading ||
            (inputType === 'image' && image === null) ||
            (inputType === 'text' && message.trim().length === 0)
          }
          onClick={handleSendMessage}
          style={{ flexShrink: 0 }}
        >
          <SendIcon />
        </Button>
      </Box>
      <ModalCustom closeButton={true} custom={{ maxWidth: '1500px', minWidth: '200px' }} />
    </div>
  );
};

export default ChatBotPage;
