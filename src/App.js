import React, {Component} from 'react';
import './App.css';
import Login from './components/Login.js';
import Homepage from './components/Homepage.js';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup.js';

class App extends Component {
  state = {
    loggedIn: false,
    currentUser: {},
    currentUserTeam: {},
    allUsers: []
  }

  // TUESDAY TODO:
  /*
  1. Get players associated with a team
  2. Displayer players
  3. make signup page
  4. build signup to send new user to backend
  5. navbar
  */

  // when component mounts 

  logIn = (userObj) => {
    let currentUserObj = this.state.allUsers.find(user => userObj.username ===  user.name)
  
    this.setState({currentUser: currentUserObj})
    
    this.setState({loggedIn: true})

    // this.getUserTeam(this.state.currentUser.id)
  }

  componentDidMount() {
    //store all current users from db in state
    fetch('http://localhost:3001/users')
    .then(resp => resp.json())
    .then(data => this.setState({allUsers: data}))
  }

  getUserTeam = (userID) => {
    fetch('http://localhost:3001/teams')
    .then(resp => resp.json())
    .then(data => this.setState({currentUserTeam: data.filter(team => team.user_id === userID)}))
  }

  getTeamPlayers = (teamID) => {
    fetch('http://localhost:3001/players')
    .then(resp => resp.json())
    .then(data => this.setState({currentUser: {...this.state.currentUser, players: data.filter(player => player.team_id === teamID)}}))
  }
  
  render()
  {
    return (
      <div>
        <Router>
        <div>
          <Route exact path='/homepage'>
            <Homepage currentUser={this.state.currentUser} getUserTeam={this.getUserTeam}/>
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/'>
            {this.state.loggedIn ? <Redirect to={{
              pathname:'/homepage'
              }} /> : <Login logIn={this.logIn} />}
          </Route>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;