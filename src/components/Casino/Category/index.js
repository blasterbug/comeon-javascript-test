'use strict';

import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

function Category( props ) {
  return (
    <div
      className="category item selected"
      onClick={ event => { props.onClick( props.id ) } } >
      <div className="content" >
        <div className="header" >
          { props.name }
        </div>
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
