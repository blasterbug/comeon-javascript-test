'use strict';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import {
  listCategories,
  listGames
} from './../../store/actions/casinoActions';

import { logoutUser } from './../../store/actions/authActions';

import Category from './Category';
import Game from './Game';

class Casino extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      searchQuery: '',
      games: props.games,
      category: 0 // ALL
    };
    this.logout = this.logout.bind( this );
    this.searchGame = this.searchGame.bind( this );
    this.selectCategory = this.selectCategory.bind( this );
  }

  logout( event ) {
    logoutUser( this.props.user.username );
  }

  searchGame( event ) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      // use this.state.games to filtered displayed games. i.e. filtered by categories
      games: _.filter( this.props.games, game => {
        return (
          game.name.toLowerCase().indexOf( searchQuery.toLowerCase() ) >= 0
        || game.description.toLowerCase().indexOf( searchQuery.toLowerCase() ) >= 0
        );
      })
    } );
  }

  selectCategory( categoryId ) {
    this.setState({
      category: categoryId,
      games: _.filter( this.props.games, game => {
        return _.includes( game.categoryIds, categoryId )
      } )
    });
  }


  componentDidMount() {
    listCategories();
    listGames();
  }

  componentWillReceiveProps( nextProps ) {
    if ( !_.isEqual( nextProps.games, this.state.games ) ) {
      this.setState({ games: nextProps.games });
    }
  }

  componentWillUpdate( nextProps, nextState ) {
    if ( !nextProps.isAuthenticated ) {
      browserHistory.push( '/login' );
    }
  }

  render() {
    const {
      categories,
      user
    } = this.props;
    const { games } = this.state;
    return (
      <div className="casino" >
        <div className="ui grid centered" >
          <div className="twelve wide column" >
            <div className="ui list" >
              <div className="player item" >
                <img className="ui avatar image" src={ user.avatar } alt="avatar" />
                <div className="content" >
                  <div className="header" >
                    <b className="name" >
                      { user.name }
                    </b>
                  </div>
                  <div className="description event" >
                    { user.event }
                  </div>
                </div>
              </div>
            </div>
            <div onClick={ this.logout } className="logout ui left floated secondary button inverted" >
              Log Out
              <i className="right sign out icon" ></i>
              </div>
            </div>
            <div className="four wide column" >
              <div className="search ui small icon input" >
                <input onChange={ this.searchGame } name="searchQuery" type="text" placeholder="Search Game" />
                <i className="search icon" ></i>
              </div>
            </div>
          </div>
          <div className="ui grid" >
            <div className="twelve wide column" >
              <h3 className="ui dividing header" >Games</h3>
              <div className="ui relaxed divided game items links" >
                {
                  // display loader while fetching
                  this.props.isFetching ?
                    <div className="ui active inverted dimmer">
                      <div className="ui text loader">Loading</div>
                    </div>
                  : games.map( game => {
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
            <div className="four wide column" >
              <h3 className="ui dividing header" >Categories</h3>
              <div className="ui selection animated list category items" >
                {
                  categories.map( category => {
                    return <Category
                      key={ category.id }
                      id={ category.id }
                      name={ category.name }
                      onClick={ this.selectCategory } />
                  } )
                }
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
  isFetching: propTypes.bool.isRequired,
  user: propTypes.shape({
    avatar: propTypes.string,
    event: propTypes.string,
    name: propTypes.string,
    username: propTypes.string,
  }).isRequired
};

Casino.defaultProps = {
  categories: [],
  errorMessage: '',
  games : [],
  isAuthenticated: false,
  isFetching: false,
  user: {},
};

// should be in a container
function mapStateToProps( state ) {
  return {
    categories: state.casino.categories,
    games: state.casino.games,
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.casino.isFetching,
    user: state.auth.user
  };
}

export default connect( mapStateToProps )( Casino );
