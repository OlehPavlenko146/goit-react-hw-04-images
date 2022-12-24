import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowmodal] = useState(false);

  const toggleModal = () => {
    setShowmodal(showModal => !showModal);
  };

  return (
    <li>
      <Image src={webformatURL} alt={tags} width="300" onClick={toggleModal} />
      {showModal && (
        <Modal large={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
