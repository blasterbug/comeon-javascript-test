'use strict';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import {
  listCategories,
  listGames
} from './../../store/actions/casinoActions';

import { logoutUser } from './../../store/actions/authActions';

import Category from './Category';
import Game from './Game';

// some of the logical should be put in a HOC
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

  // perfrom actual search within games
  filterGames( searchQuery, games ) {
    let filteredGames = [];
    // look at games names
    filteredGames = _.filter( games, game => {
      return new RegExp( searchQuery, 'i' ).test( game.name );
    });
    // if no hit, look into games description
    if ( filteredGames.length < 1 ) {
      filteredGames = _.filter( games, game => {
        return new RegExp( `${searchQuery}{1,}`, 'i' ).test( game.description );
      });
    }
    return filteredGames;
  }

  // filter all games, ignore selected category
  searchGame( event ) {
    const searchQuery = event.target.value;
    if ( searchQuery.length > 0) {
      this.setState({
        searchQuery,
        // use this.state.games to filtered displayed games. i.e. filtered by categories
        games: this.filterGames( searchQuery, this.props.games )
      });
    }
    else {
      this.setState({ searchQuery });
    }
  }

  // filter games by category
  selectCategory( categoryId ) {
    this.setState({
      category: categoryId,
      searchQuery: '',
      games: _.filter( this.props.games, game => {
        return _.includes( game.categoryIds, categoryId )
      } )
    });
  }

  // only fetch data when component actually displayed
  componentDidMount() {
    listCategories();
    listGames();
  }

  // ensure user is logged in
  componentWillUpdate( nextProps, nextState ) {
    if ( !nextProps.isAuthenticated ) {
      browserHistory.push( '/login' );
    }
    // because it renders from state and not props, ensure state is in sync with props
    if ( !_.isEqual( nextProps.games, this.props.games ) ) {
      this.setState({ games: nextProps.games });
    }
    // when search is being erase, displayed the whole list of games
    if ( nextState.searchQuery.length < 1 && this.state.searchQuery.length > 1 ) {
      this.setState({ games: nextProps.games });
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
                <img
                  alt="avatar"
                  className="ui avatar image"
                  src={ user.avatar } />
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
            <button className="small ui secondary left labeled icon button" onClick={ this.logout } >
              <i className="right flipped sign out icon" ></i>
              Log Out
            </button>
          </div>
          <div className="four wide column search" >
            <div className={ classNames(
              'ui small icon input',
              { error: (this.state.games.length < 1  && this.state.searchQuery.length>1) }
            ) } >
              <input
                name="searchQuery"
                onChange={ this.searchGame }
                placeholder="Search Game"
                type="text"
                value={ this.state.searchQuery } />
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
