import { createContext, ReactNode } from 'react';

export interface ModalProps {
  title?: ReactNode;
  content?: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  onMounted?: () => void;
}

export interface ModalContextType {
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
  open: boolean;
  modalProps?: ModalProps;
}

export const ModalContext = createContext<ModalContextType>({
  openModal: () => {
    return;
  },
  closeModal: () => {
    return;
  },
  open: false,
  modalProps: undefined,
});

export const ModalProvider = ModalContext.Provider;
