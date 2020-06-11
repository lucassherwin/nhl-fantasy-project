import React, {Component} from 'react';
import './App.css';
import Login from './components/Login.js';
import Homepage from './components/Homepage.js';
import { Route, Redirect, Switch } from 'react-router-dom';
import Signup from './components/Signup.js';
import PlayerPage from './components/PlayerPage.js'
import Navbar from './components/Navbar.js';

class App extends Component {
  state = {
    loggedIn: false,
    currentUser: {},
    allUsers: [],
    currentPlayer: null,
    userTeam: {
      team: [],
      name: '',
      location: ''
    }
  }

  logIn = (userObj) => {
    let currentUserObj = this.state.allUsers.find(user => userObj.username ===  user.name)
  
    this.setState({currentUser: currentUserObj})
    
    this.setState({loggedIn: true})
  }

  setCurrentPlayer = (player) => {
    this.setState({currentPlayer: player})
  }

  addPlayerToUserTeam = (player) => {
    let teamArr = this.state.userTeam.team
    teamArr.push(player)

    this.setState({userTeam: {...this.state.userTeam, team: teamArr}})
    alert(`${player.name} has been added to your team`)
    //this will set userTeam
  }

  createUserTeam = (event, name, location) => {
    // event.preventDefault();
    this.setState({userTeam: {...this.state.userTeam, name: name, location: location}})
  }

  componentDidMount() {
    //store all current users from db in state
    fetch('http://localhost:3001/users')
    .then(resp => resp.json())
    .then(data => this.setState({allUsers: data}))
  }
  
  render()
  {
    return (
      <div>
        {/* <Router> */}
        <Navbar />
        <div>
        <Switch>
        {/* <Route exact path='playerPage/:id' component={PlayerPage} />          */}
            <Route exact path='/playerPage/:id' >
              {/* {this.state.playerObj !== null ? <PlayerPage /> : null} */}
              <PlayerPage setCurrentPlayer={this.setCurrentPlayer} currentPlayer={this.state.currentPlayer} addPlayerToUserTeam={this.addPlayerToUserTeam}/>
          </Route>
          {/* <Route exact path='/homepage' >
            <Homepage currentUser={this.state.currentUser} getUserTeam={this.getUserTeam} setPlayerObj={this.setPlayerObj} />
          </Route> */}
          <Route exact path='/homepage' render={(props) => <Homepage {...props} currentUser={this.state.currentUser}
          setCurrentPlayer={this.setCurrentPlayer} currentPlayer={this.state.currentPlayer} userTeam={this.state.userTeam} createUserTeam={this.createUserTeam}/>}
          />
          {/* <Route exact path='/signup'>
            <Signup />
          </Route> */}
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/'>
            {this.state.loggedIn ? <Redirect to={{
              pathname:'/homepage'
              }} /> : <Login logIn={this.logIn} />}
          </Route>
          {/* {this.state.loggedIn ? <Redirect to={{
              pathname:'/homepage'
              }} /> : <Login logIn={this.logIn} />} */}
          </Switch>
        </div>
        {/* </Router> */}
      </div>
    );
  }
}

export default App;