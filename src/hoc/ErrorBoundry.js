import React, { Component } from 'react';


class ErrorBoundry extends Component {
  state= { 
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error}
  }

  render() {
    if(this.state.hasError) {
      return (
        <div className="alert alert-danger">
          Sorry I have Problem :(
        </div>
      );
    }
    return this.props.children;
  
 }
}  

// exporeted to routs
export default ErrorBoundry;