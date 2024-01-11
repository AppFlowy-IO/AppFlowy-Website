import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ModalContext } from '@/lib/hooks/use-modal';

function Modal() {
  const { open, closeModal, modalProps } = useContext(ModalContext);

  useEffect(() => {
    modalProps?.onMounted?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      PaperProps={{
        className: `modal-paper max-w-[530px]`,
      }}
      open={open}
      onClose={closeModal}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' className={'modal-title'}>
        <div>{modalProps?.title}</div>
      </DialogTitle>
      <DialogContent className={'pb-2'}>
        <DialogContentText className={'desc'} id='alert-dialog-description'>
          {modalProps?.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={'modal-actions'}>
        <Button
          className={'cancel-btn'}
          onClick={() => {
            modalProps?.onCancel?.();
            closeModal();
          }}
        >
          {modalProps?.cancelText || 'Cancel'}
        </Button>
        <Button
          className={'ok-btn'}
          onClick={() => {
            modalProps?.onOk?.();
            closeModal();
          }}
          autoFocus
        >
          {modalProps?.okText || 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
