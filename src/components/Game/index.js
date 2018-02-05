'use strict';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  browserHistory,
  Link
} from 'react-router';

class Game extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      game: props.params.game
    };
  }

  componentDidMount() {
    comeon.game.launch( this.state.game );
  }

  render() {
    return (
      <div className="ingame">
        <div className="ui grid centered">
          <div className="three wide column">
            <Link
              onClick={browserHistory.goBack}
              className="ui right floated secondary button inverted" >
              <i className="left chevron icon"></i>
              Back
            </Link>
          </div>
          <div className="ten wide column">
            <div id="game-launch">
            </div>
          </div>
          <div className="three wide column">
          </div>
        </div>
      </div>
      );
    }
}

export default Game;
// export default connect( mapStateToProps )( Game );
