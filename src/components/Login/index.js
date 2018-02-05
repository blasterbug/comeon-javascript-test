'use strict'

import React, { Component } from 'react';

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
    this.setState( { value: event.target.value } );
  }

  handleSubmit( event ) {
    alert( 'A name was submitted: ' + this.state.value );
    event.preventDefault();
  }

  render() {
    return (
      <div className="login" style={{ display: 'block' }} >
        <div className="ui grid centered" >
          <form onSubmit={this.handleSubmit} >
            <div className="fields" >
                <div className="required field" >
                    <div className="ui icon input" >
                      <input type="text" name="username" placeholder="Username" />
                      <i className="user icon" ></i>
                    </div>
                </div>
                <div className="required field" >
                  <div className="ui icon input" >
                    <input type="password" name="password" placeholder="Password" />
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

export default Login;
