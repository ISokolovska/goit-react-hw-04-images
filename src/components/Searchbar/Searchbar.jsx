import { PropTypes } from 'prop-types';
import { Component } from 'react';
import Notiflix from 'notiflix';
import { SearchbarImage, Form, FormButton, InputForm } from './Styled';
export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ query: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { query } = this.state;
    const fixedQuery = query.trim();
    if (fixedQuery === '') {
      Notiflix.Notify.warning('Please enter a query !');
      return;
    }
    this.props.setQuery(fixedQuery);
  };

  render() {
    return (
      <SearchbarImage className="searchbar">
        <Form className="form" onSubmit={this.handleSubmit}>
          <FormButton type="submit" className="button">
            <img
              src="https://img.icons8.com/ios-glyphs/30/null/search--v1.png"
              alt="seach"
            />
          </FormButton>

          <InputForm
            className="input"
            name="search"
            onChange={this.handleChange}
            value={this.state.query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarImage>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
