'use strict';

import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';

function Game( props ) {
  return (
    <div className="game item">
      <div className="ui small image">
        <img src={ props.icon } alt="game-icon" />
      </div>
      <div className="content">
        <Link to={ `/casino/${props.code}` } className="header">
          <b className="name">
            { props.name }
          </b>
        </Link>
        <div className="description">
          { props.description }
        </div>
        <div className="extra">
          <div className="play ui right floated">
            <Link to={ `/casino/${props.code}` } className="ui right labeled icon secondary button" >
              Play
              <i className="right chevron icon"></i>
            </Link>
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

export default Game;
