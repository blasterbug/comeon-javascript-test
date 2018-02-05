'use strict'

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { loginUser } from './../../store/actions/authActions';

class Login extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      errorMessage: props.errorMessage,
      isAuthenticated: props.isAuthenticated,
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

  render() {
    return (
      <div className="login">
        <div className="ui grid centered" >
          <form onSubmit={ this.handleSubmit } >
            <div className="fields" >
                <div className="required field" >
                    <div className="ui icon input" >
                      <input
                        name="username"
                        onChange={ this.handleChange }
                        placeholder="Username"
                        type="text" />
                      <i className="user icon" ></i>
                    </div>
                </div>
                <div className="required field" >
                  <div className="ui icon input" >
                    <input
                      name="password"
                      onChange={ this.handleChange }
                      placeholder="Password"
                      type="password" />
                    <i className="lock icon" ></i>
                  </div>
                </div>
              <div className="field" >
                <div className="ui icon input" >
                  <input type="submit" value="Login" />
                  <i className="right chevron icon" ></i>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  errorMessage: propTypes.string.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  user: propTypes.shape({
    avatar: propTypes.string,
    event: propTypes.string,
    name: propTypes.string
  }).isRequired
};

Login.defaultProps = {
  errorMessage: '',
  isAuthenticated: false,
  user: {}
};

// should be in a container
function mapStateToProps( state ) {
  return {
    errorMessage: state.auth.errorMessage,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
}

export default connect( mapStateToProps )( Login );
