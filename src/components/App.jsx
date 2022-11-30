import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { getImages } from './services/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ModalWindow } from './Modal/Modal';
import { AppContainer } from './Styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!query) return;
    setPage(1);
    setImages([]);
    fetchImages(query, 1);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    if (page !== 1) {
      fetchImages(query, page);
    }
    // eslint-disable-next-line
  }, [page]);

  const addPage = () => {
    setPage(prevState => {
      return prevState + 1;
    });
    // this.setState();
  };

  const toggleModal = data => {
    setIsOpenModal(prevState => !prevState);
    setModalData(data);
  };
  const fetchImages = async (query, page) => {
    setIsLoading(true);
    try {
      const data = await getImages(query, page);
      if (data.hits.length === 0) {
        Notiflix.Notify.info('Sorry, we have not found anything !');
      }
      setImages(prevState => [...prevState, ...data.hits]);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      Notiflix.Notify.failure(error);
    }
  };
  return (
    <AppContainer>
      <Searchbar addQuery={setQuery}></Searchbar>
      {images.length > 0 && (
        <>
          <ImageGallery images={images} toggleModal={toggleModal} />
          <Button addPage={addPage}>Load more</Button>
        </>
      )}
      {isLoading === true && <Loader />}
      {isOpenModal && (
        <ModalWindow toggleModal={toggleModal} modalData={modalData} />
      )}
    </AppContainer>
  );
};
