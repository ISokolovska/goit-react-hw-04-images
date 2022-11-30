import { Component } from 'react';
import { Overlay, Modal } from './Styled';
import { Loader } from 'components/Loader/Loader';

export class ModalWindow extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }
  handleLoading = () => {
    this.setState({ isLoading: false });
  };

  handleClose = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.modalData;
    return (
      <Overlay className="overlay" onClick={this.handleClose}>
        <Modal className="modal">
          {this.state.isLoading === true && <Loader />}
          <img src={largeImageURL} alt={tags} onLoad={this.handleLoading} />
        </Modal>
      </Overlay>
    );
  }
}
