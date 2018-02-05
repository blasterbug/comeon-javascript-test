'use strict';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  listCategories,
  listGames
} from './../../store/actions/casinoActions';

import Category from './Category';
import Game from './Game';

class Casino extends Component {

  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    listCategories();
    listGames();
  }

  render() {
    const {
      categories,
      games,
      user
    } = this.props;
    return (
      <div className="casino">
        <div className="ui grid centered">
          <div className="twelve wide column">
            <div className="ui list">
              <div className="player item">
                <img className="ui avatar image" src={ user.avatar } alt="avatar" />
                <div className="content">
                  <div className="header">
                    <b className="name">
                      { user.name }
                    </b>
                  </div>
                  <div className="description event"></div>
                </div>
              </div>
            </div>
            <div className="logout ui left floated secondary button inverted">
              <i className="left chevron icon"></i>Log Out
              </div>
            </div>
            <div className="four wide column">
              <div className="search ui small icon input ">
                <input type="text" placeholder="Search Game" />
                <i className="search icon"></i>
              </div>
            </div>
          </div>
          <div className="ui grid">
            <div className="twelve wide column">
              <h3 className="ui dividing header">Games</h3>
              <div className="ui relaxed divided game items links">
                {
                  games.map( game => {
                    return <Game
                      key={ game.code }
                      categoryIds={ game.categoryIds }
                      code={ game.code }
                      description={ game.description }
                      icon={ game.icon }
                      name={ game.name } />
                  })
                }
              </div>
            </div>
            <div className="four wide column">
              <h3 className="ui dividing header">Categories</h3>
              <div className="ui selection animated list category items">
                <div className="content">
                {
                  categories.map( category => {
                    return <Category key={ category.id } id={ category.id } name={ category.name } />
                  } )
                }
              </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

Casino.propTypes = {
  categories: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string
    })
  ).isRequired,
  errorMessage: propTypes.string.isRequired,
  games: propTypes.arrayOf(
    propTypes.shape({
      categoryIds: propTypes.arrayOf(propTypes.number),
      code: propTypes.string,
      description: propTypes.string,
      icon: propTypes.string,
      name: propTypes.string
    })
  ).isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  user: propTypes.shape({
    avatar: propTypes.string,
    event: propTypes.string,
    name: propTypes.string
  }).isRequired
};

Casino.defaultProps = {
  categories: [],
  errorMessage: '',
  games : [],
  infoMessage: '',
  isAuthenticated: false,
  user: {},
};

// should be in a container
function mapStateToProps( state ) {
  return {
    categories: state.casino.categories,
    games: state.casino.games,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
}

export default connect( mapStateToProps )( Casino );
