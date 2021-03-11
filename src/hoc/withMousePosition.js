import React, { Component } from 'react';

//Logic for moving picture, exported to Header.js

const withMousePosition = (WrappedComponent) => {
  class Hoc extends Component {
    state = {
      x: 0,
      y: 0
    };

    updateMousePosition = (e) => {
      this.setState({
        x: e.pageX,
        y: e.pageY
      })
    }

    componentDidMount() {
      document.body.addEventListener('mousemove', this.updateMousePosition)
    }
    render() {
      return(
        <WrappedComponent 
        { ...this.props }
        mouseX={this.state.x}
        mouseY={this.state.y}
        />
      )
    }
  }
  return Hoc;
}

export default withMousePosition;