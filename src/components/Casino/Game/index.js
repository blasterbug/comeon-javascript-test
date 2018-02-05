'use strict';

import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

function Game( props ) {
  return (
    <div key={ props.code } className="game item">
      <div className="ui small image">
        <img src={ props.icon } alt="game-icon" />
      </div>
      <div className="content">
        <div className="header">
          <b className="name">
            { props.name }
          </b>
        </div>
        <div className="description">
          { props.description }
        </div>
        <div className="extra">
          <div onClick={ props.onClick } className="play ui right floated secondary button inverted">
            Play
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

Game.propTypes = {
  categoryIds: propTypes.arrayOf(propTypes.number),
  code: propTypes.string,
  description: propTypes.string,
  icon: propTypes.string,
  name: propTypes.string
};

Game.defaultProps = {
  onClick: null
};

export default Game;
