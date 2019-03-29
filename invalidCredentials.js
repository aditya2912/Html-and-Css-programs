import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


class InvalidCredentials extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {}

  render() {
    return (
      <h1> You seem to have entered wrong credentials </h1>
    )
  }
}

export default InvalidCredentials
