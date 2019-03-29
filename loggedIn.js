import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom";

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    nameOfTheUser: ""
  }

  componentDidMount() {
      let nameOfUser = this.props.userName
      console.log(nameOfUser, "++++++++")
    }

  render() {
    return (
       <LoggedInRouter />
    )
  }
}

function LoggedInPageComponent() {
  return (
    <div>
        <p> This page has been routed </p>
    </div>
  );
}

function LoggedInRouter() {
  return (
    <Router>
        <div>
          <nav>
            <Link to="/loggedInPage"> This is logged In page </Link>
          </nav>
          <Route path="/loggedInPage" exact component={LoggedInPageComponent} />
        </div>
    </Router>
  );
}

export default LoggedIn
