'use strict';

import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

function Category( props ) {
  return (
    <div onClick={ props.onClick } className="category item">
      <div className="header">
        {
          props.selected ? <b>{ props.name }</b> : props.name
        }
      </div>
    </div>
  );
}

Category.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  onClick: propTypes.func,
  selected: propTypes.bool
};

Category.defaultProps = {
  onClick: null,
  selected: false
};


export default Category;
