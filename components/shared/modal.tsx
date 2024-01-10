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
        className: `popover-paper`,
      }}
      open={open}
      onClose={closeModal}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{modalProps?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText className={'desc'} id='alert-dialog-description'>
          {modalProps?.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className={'cancel-btn dark:hover:bg-primary-20 hover:bg-light-blue-gray text-[var(--color-primary)]'}
          onClick={() => {
            modalProps?.onCancel?.();
            closeModal();
          }}
        >
          {modalProps?.cancelText || 'Cancel'}
        </Button>
        <Button
          className={'ok-btn dark:hover:bg-primary-20 hover:bg-light-blue-gray text-[var(--color-primary)]'}
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
