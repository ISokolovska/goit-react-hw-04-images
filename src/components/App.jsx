import React from 'react';
import { getImages } from './services/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ModalWindow } from './Modal/Modal';
import { AppContainer } from './Styled';
export class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    error: '',
    isLoading: false,
    isOpenModal: false,
    modalData: null,
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({
        page: 1,
        images: [],
      });
      await this.fetchImages(this.state.query, 1);
    }
    if (
      this.state.page !== prevState.page &&
      this.state.query === prevState.query &&
      this.state.page !== 1
    ) {
      await this.fetchImages(this.state.query, this.state.page);
    }
  }

  setQuery = query => {
    this.setState({
      query,
    });
  };

  addPage = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  toggleModal = data => {
    this.setState(prevState => {
      return {
        isOpenModal: !prevState.isOpenModal,
        modalData: data,
      };
    });
  };

  async fetchImages(query, page) {
    this.setState({
      isLoading: true,
    });
    try {
      const data = await getImages(query, page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
          isLoading: false,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <AppContainer>
        <Searchbar setQuery={this.setQuery}></Searchbar>
        {this.state.images.length > 0 && (
          <>
            <ImageGallery
              images={this.state.images}
              toggleModal={this.toggleModal}
            />
            <Button addPage={this.addPage}>Load more</Button>
          </>
        )}
        {this.state.isLoading === true && <Loader />}
        {this.state.isOpenModal && (
          <ModalWindow
            toggleModal={this.toggleModal}
            modalData={this.state.modalData}
          />
        )}
      </AppContainer>
    );
  }
}
