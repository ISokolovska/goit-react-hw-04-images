import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Notiflix from 'notiflix';
import { SearchbarImage, Form, FormButton, InputForm } from './Styled';
export const Searchbar = ({ addQuery }) => {
  const [query, setQuery] = useState('');
  const handleChange = evt => {
    const { value } = evt.target;
    setQuery(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const fixedQuery = query.trim();
    if (fixedQuery === '') {
      Notiflix.Notify.warning('Please enter a query !');
      return;
    }
    addQuery(fixedQuery);
  };

  return (
    <SearchbarImage className="searchbar">
      <Form className="form" onSubmit={handleSubmit}>
        <FormButton type="submit" className="button">
          <img
            src="https://img.icons8.com/ios-glyphs/30/null/search--v1.png"
            alt="seach"
          />
        </FormButton>

        <InputForm
          className="input"
          name="search"
          onChange={handleChange}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarImage>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
