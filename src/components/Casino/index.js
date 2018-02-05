'use strict';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Casino extends Component {

  constructor( props ){
    super( props );
  }

  render() {
    const { user } = this.props;
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
                <div className="game item">
                  <div className="ui small image">
                    <img src="" alt="game-icon" />
                  </div>
                  <div className="content">
                    <div className="header"><b className="name"></b></div>
                    <div className="description">
                    </div>
                    <div className="extra">
                      <div className="play ui right floated secondary button inverted">
                        Play
                        <i className="right chevron icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="four wide column">
              <h3 className="ui dividing header">Categories</h3>

              <div className="ui selection animated list category items">

                <div className="category item">
                  <div className="content">
                    <div className="header"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

Casino.propTypes = {
  errorMessage: propTypes.string.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  user: propTypes.shape({
    avatar: propTypes.string,
    event: propTypes.string,
    name: propTypes.string
  }).isRequired
};

Casino.defaultProps = {
  errorMessage: '',
  infoMessage: '',
  isAuthenticated: false,
  user: {}
};

// should be in a container
function mapStateToProps( state ) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
}

export default connect( mapStateToProps )( Casino );
