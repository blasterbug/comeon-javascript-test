'use strict'

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import classNames from 'classnames';

import { loginUser } from './../../store/actions/authActions';

class Login extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      password: '',
      username: ''
    };
    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleChange( event ) {
    this.setState( { [event.target.name]: event.target.value } );
  }

  handleSubmit( event ) {
    event.preventDefault();
    loginUser( this.state.username, this.state.password );
  }

  componentWillUpdate( nextProps, nextState ) {
    if ( nextProps.isAuthenticated ) {
      browserHistory.push( '/casino' );
    }
  }

  componentDidunMount() {
    this.setState({
      password: '',
      username: ''
    });
  }

  render() {
    return (
      <div className="ui middle aligned centered grid">
        <div className="six wide column" >
          <form
            onSubmit={ this.handleSubmit }
            className={ classNames(
                'ui form',
                { loading: this.props.isFetching },
                { error: this.props.errorMessage } )
            } >
            <div className="ui error message">
              <p>{ this.props.errorMessage }</p>
            </div>
            <div className="required field" >
                <div className="ui icon input" >
                  <input
                    name="username"
                    onChange={ this.handleChange }
                    placeholder="Username"
                    type="text"
                    value={ this.state.username } />
                  <i className="user icon" ></i>
                </div>
            </div>
            <div className="required field" >
              <div className="ui icon input" >
                <input
                  name="password"
                  onChange={ this.handleChange }
                  placeholder="Password"
                  type="password"
                  value={ this.state.password } />
                <i className="lock icon" ></i>
              </div>
            </div>
            <div className="field" >
              <div className="ui icon input" >
                <input type="submit" value="Login" />
                <i className="right sign in icon" ></i>
              </div>
            </div>
          </form>
        </div>
        <div className="column" ></div>
      </div>
    );
  }
}

Login.propTypes = {
  errorMessage: propTypes.string.isRequired,
  user: propTypes.shape({
    avatar: propTypes.string,
    event: propTypes.string,
    name: propTypes.string,
    username: propTypes.string
  }).isRequired
};

Login.defaultProps = {
  errorMessage: '',
  isAuthenticated: false,
  isFetching: false,
  user: {}
};

// should be in a container
function mapStateToProps( state ) {
  return {
    errorMessage: state.auth.errorMessage,
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
    user: state.auth.user
  };
}

export default connect( mapStateToProps )( Login );
