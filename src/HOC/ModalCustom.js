import Modal from '@mui/material/Modal';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../redux/reducer/ModalReducer';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalCustom = ({ closeButton, custom }) => {
  const style = {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    boxShadow: 2,
    borderRadius: 1,
    overflow: 'hidden',
    ...custom,
  };

  const { visible, ComponentContent } = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal
      open={visible}
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{ backdrop: { sx: { backdropFilter: 'blur(4px)' } } }}
    >
      <Box sx={style}>
        {closeButton && (
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        )}
        {ComponentContent}
      </Box>
    </Modal>
  );
};

export default ModalCustom;
