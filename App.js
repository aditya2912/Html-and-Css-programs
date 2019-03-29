import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import LoggedIn from './loggedIn';
import InvalidCredentials from './invalidCredentials';
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    userName: "",
    shouldNavigate: 0,
    password: "",
    registeredUsers: []
  }

  // componentDidMount() {
  //   this.navigateToPage()
  // }
  //
  // getAllUsers = event => {
  //   fetch('http://localhost:5454/posts')
  //   .then(resp => resp.json())
  //   .then(data => this.setState({registeredUsers: data}))
  // }

  handleUserNameChange = event => {
    this.setState({userName: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  navigateToPage = event => {
    let registeredUsers = this.state.registeredUsers
        fetch('http://localhost:5454/posts')
        .then(resp => resp.json())
        .then(data => this.setState({registeredUsers: data}))

    let filteredUsers =
        this.state.registeredUsers.filter(function(userObject){
        return ((userObject.title == this.state.userName)  && (userObject.tags == this.state.password))
    })
    let currentUser = filteredUsers[0]
    console.log(currentUser, "CURRENT USER")

    if ((currentUser.title == this.state.userName) && (currentUser.tags == this.state.password)) {
      try {
      this.setState({shouldNavigate: 3})
    }
    catch(err) {
      alert("Unable to log in user")
    }
    } else {
      this.setState({shouldNavigate: 4})
    }

  }

  renderRegisterPage = event => {
    this.setState({shouldNavigate: 2})
  }

  renderLoginPage = event => {
    this.setState({shouldNavigate: 3})
  }

  mainPage() {
    return (
      <div>
        <input type="button" value="Register" onClick = {this.renderRegisterPage} />
        {" "}
        <input type="button" value="Login" onClick ={this.renderLoginPage} />
      </div>
    )
  }

  registerUser = event =>  {
    let userName = this.state.userName
    let password = this.state.password
    let userObject = JSON.stringify({
      title: userName,
      tags: password
    })
    try {
    fetch('http://localhost:5454/posts',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: userObject
    })
    .then(res => res.json())
    this.setState({shouldNavigate: 0})
  }
   catch(err) {
     alert("Unable to register User")
   }

  }

  registerComponent() {
    return (
      <div>
        <input type = "text" value= {this.state.userName} onChange = {this.handleUserNameChange} />
        <br />
        <input type = "text" value = {this.state.password} onChange = {this.handlePasswordChange} />
        <br />
        <input type = "button" value = "Register" onClick = {this.registerUser} />
      </div>
    )
  }

   loginComponent() {
    return (
        <div>
        <input type="text" value={this.state.userName} onChange = {this.handleUserNameChange} />
        <br />
        <input type="text" value ={this.state.password} onChange = {this.handlePasswordChange} />
        <br />
        <input type="button" value="Click Me" onClick= {this.navigateToPage} />
      </div>
    );
  }

  render() {
    if  (this.state.shouldNavigate == 0) {
    return (
      <div>
          {this.mainPage()}
      </div>
      )
    } else if (this.state.shouldNavigate == 3) {
      return (
        <div>
        {this.loginComponent()}
        </div>
      )
      // return (<LoggedIn userName = {this.state.userName} />)
    } else if (this.state.shouldNavigate == 2) {
        return (
        <div>
            {this.registerComponent()}
         </div>
       )
    } else if (this.state.shouldNavigate == 4) {
      return (<LoggedIn userName = {this.state.userName} />)
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
