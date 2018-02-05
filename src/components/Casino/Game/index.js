'use strict';

import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';

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
          <Link to={ `/casino/${props.code}` } className="play ui right floated secondary button inverted">
            Play
            <i className="right chevron icon"></i>
          </Link>
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

export default Game;
