import React, { Component } from "react";

function asyncComponent( importComponent ) {
  class AsyncComponent extends Component {
    constructor( props ) {
      super( props );
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component
      });
    }

    render() {
      const Component = this.state.component;
      if ( Component ) {
      return <Component { ...this.props } />
      }
      else {
        return <div className="ui segment">
          <p></p>
          <div class="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
        </div>
      }
    }
  }

  return AsyncComponent;
}

export default asyncComponent;
