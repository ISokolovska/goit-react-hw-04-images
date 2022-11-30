import { useState, useEffect } from 'react';
import { Overlay, Modal } from './Styled';
import { Loader } from 'components/Loader/Loader';

export const ModalWindow = ({ toggleModal, modalData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = () => {
    setIsLoading(false);
  };

  const handleClose = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const { largeImageURL, tags } = modalData;

  useEffect(() => {
    const handleClose = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [toggleModal]);

  return (
    <Overlay className="overlay" onClick={handleClose}>
      <Modal className="modal">
        {isLoading === true && <Loader />}
        <img src={largeImageURL} alt={tags} onLoad={handleLoading} />
      </Modal>
    </Overlay>
  );
};
