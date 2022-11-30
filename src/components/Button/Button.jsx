import React from 'react';
import { PropTypes } from 'prop-types';
import { ButtonLoadMore } from './Styled';

export const Button = ({ addPage }) => {
  return (
    <ButtonLoadMore type="button" onClick={addPage}>
      Load more
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  addPage: PropTypes.func,
};
