'use strict';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {

  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    comeon.game.launch( this.props.gameCode );
  }

  render() {
    return (
      <div className="ingame">
        <div className="ui grid centered">
          <div className="three wide column">
            <div className="ui right floated secondary button inverted">
              <i className="left chevron icon"></i>
              Back
            </div>
          </div>
          <div className="ten wide column">
            <div id="game-launch">
            </div>
          </div>
          <div className="three wide column">
            ??
          </div>
        </div>
      </div>
      );
    }
}

Game.propTypes = {
  gameCode: propTypes.string.isRequired
};

Game.defaultProps = {
  gameCode: null
};

// // should be in a container
function mapStateToProps( state ) {
  return {
    gameCode: state.casino.categories,
  };
}

export default Game;
// export default connect( mapStateToProps )( Game );
