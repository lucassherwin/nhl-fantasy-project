import React, {Component} from 'react';
import './App.css';
import Login from './components/Login.js';
import Homepage from './components/Homepage.js';

class App extends Component {
  state = {
    loggedIn: false,
    currentUser: {}
  }

  // SUNDAY TODO:
  /*
  1. make signup page
  2. investigate routing
  3. have link to signup page below login form
  4. build signup to send new user to backend
  5. build findUser method to find a user in the backend when logging in
  6. start building homepage
  */

  // when component mounts 

  logIn = (userObj) => {
    this.setState({currentUser: userObj})
    this.setState({loggedIn: true})
  }

  findUser = (event, username) => {
    event.preventDefault();

    // for now, just store user in currentUser state
    // refactor to find user in backend and put that userObj in state
    // will have to make an allUsers state obj
    // take care of this on sunday
    // store allUsers in state temporarily -> this will become slower as more users are added

    // let currentUserObj = this.state.allUsers.find(user => user.username === username)
    // console.log('current user obj', currentUserObj)

    // this.getUserPosts(currentUserObj.id)
    // this.getUserCaptions(currentUserObj.id)
    
    // this.setState({currentUser: {...this.state.currentUser, userID: currentUserObj.id, username: currentUserObj.username}})
  }
  
  render()
  {
    return (
      <div>
        {this.state.loggedIn ? <Homepage user={this.state.currentUser}/> : <Login logIn={this.logIn} />}
      </div>
    );
  }
}

export default App;
