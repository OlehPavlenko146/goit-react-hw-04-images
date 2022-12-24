import { useEffect } from 'react';
import { ModalImage, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const addModal = document.querySelector('#modal-root');
export const Modal = ({ large, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalImage src={large} alt={alt} width="600" />
    </Overlay>,
    addModal
  );
};

Modal.propTypes = {
  large: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
