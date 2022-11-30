import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './Styled';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ImageGalleryList className="gallery">
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            toggleModal={toggleModal}
          />
        );
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
