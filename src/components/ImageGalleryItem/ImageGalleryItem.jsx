import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem, ImageItemShow } from './Styled';

export const ImageGalleryItem = ({
  image: { id, tags, webformatURL, largeImageURL },
  toggleModal,
}) => {
  return (
    <ImageItem
      className="gallery-item"
      onClick={() => {
        toggleModal({ tags, largeImageURL });
      }}
    >
      <ImageItemShow src={webformatURL} alt={tags} />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
