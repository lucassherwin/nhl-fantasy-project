import React, {Component} from 'react';
import './App.css';
import Login from './components/Login.js';
import Homepage from './components/Homepage.js';
import { Route, Redirect, Switch } from 'react-router-dom';
import Signup from './components/Signup.js';
import PlayerPage from './components/PlayerPage.js'
import Navbar from './components/Navbar.js';
import Matchup from './components/Matchup.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyTeam from './components/MyTeam.js';
import CreateTeam from './components/CreateTeam.js';
// import { Nav } from 'react-bootstrap';
import axios from 'axios';

class App extends Component {
  state = {
    loggedIn: false,
    currentUser: {
      username: null,
      userID: null,
      rememberMe: false
    },
    currentPlayer: null,
    userTeam: {
      team: [],
      name: '',
      location: '',
      isCreated: false
    },
    npcTeam1: [],
    npcTeam2: [],
  }

  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const username = rememberMe ? localStorage.getItem('user') : '';
    const userID = rememberMe ? localStorage.getItem('userID') : '';
    // const userID = rememberMe ? localStorage.getItem('userID') : '';
    this.setState({currentUser: {...this.state.currentUser, username, rememberMe, userID}});
    this.setState({loggedIn: rememberMe});
  }

  logIn = (username, rememberMe) => {
    console.log('in logIn userObj', username);
    // this.setState({loggedIn: true});
    // this.setState({currentUser: username, loggedIn: true});

    axios.post(`http://localhost:3001/login`, {username})
    .then(resp => {
      this.setState({currentUser: {...this.state.currentUser, username: resp.data['username'], userID: resp.data['id'], rememberMe}})
      this.setState({loggedIn: true})
      // local storage
      localStorage.setItem('rememberMe', rememberMe);
      localStorage.setItem('user', rememberMe ? username : '');
      localStorage.setItem('userID', rememberMe ? this.state.currentUser.userID : '');

      // get the users team
      this.getUserTeam(this.state.currentUser.userID)
    })
  }

  getUserTeam = (userID) => {
    // gets all the teams
    // currently this just gets the first team in the backend (should only be one per user)
    // can be changed and expanded if multiple users is ever implemented
    axios.get('http://localhost:3001/teams')
    .then(resp => this.setState({userTeam: {...this.state.userTeam, name: resp.data[0]['name'], location: resp.data[0]['location'], isCreated: true}}))
  }

  setCurrentPlayer = (player) => {
    console.log(player)
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
    console.log('create team', name, location)
    this.setState({userTeam: {...this.state.userTeam, name: name, location: location, isCreated: !this.state.userTeam.isCreated}})
  }

  setNPCTeams = (player1, player2) => {
    console.log('npc player 1: ', player1)
    console.log('npc player 2:', player2)
    
    //npcTeam1
    let npc1 = this.state.npcTeam1;
    npc1.push(player1)
    this.setState({npcTeam1: npc1})
    console.log('npcTeam1: ', this.state.npcTeam1)

    //npcTeam2
    let npc2 = this.state.npcTeam2;
    npc2.push(player2)
    this.setState({npcTeam2: npc2})
    console.log('npcTeam2: ', this.state.npcTeam2)
  }
  
  render()
  {
    return (
      <div>
        {this.state.loggedIn ? <Navbar /> : null}
        <div>
          <Switch>
            <Route exact path='/playerPage/:id' >
              <PlayerPage setCurrentPlayer={this.setCurrentPlayer} currentPlayer={this.state.currentPlayer} addPlayerToUserTeam={this.addPlayerToUserTeam}/>
            </Route>
            <Route exact path='/homepage' render={(props) => <Homepage {...props} setNPCTeams={this.setNPCTeams} npcTeam1={this.state.npcTeam1} 
            npcTeam2={this.state.npcTeam2} currentUser={this.state.currentUser} setCurrentPlayer={this.setCurrentPlayer} userTeam={this.state.userTeam} 
            createUserTeam={this.createUserTeam} />}
            />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/'>
              {this.state.loggedIn ? <Redirect to={{pathname:'/homepage'}} /> : <Redirect to={{pathname:'/login'}} />}
            </Route>
            <Route exact path='/login'><Login logIn={this.logIn}/></Route>
            <Route exact path='/matchup' render={(props) => <Matchup {...props} userTeam={this.state.userTeam} currentUser={this.state.currentUser} npcTeam1={this.state.npcTeam1} npcTeam2={this.state.npcTeam2} />} />
            <Route exact path='/myteam' render={(props) => <MyTeam {...props} userTeam={this.state.userTeam} currentUser={this.state.currentUser} />} />
            <Route exact paht='/create' render={(props) => <CreateTeam {...props} createUserTeam={this.createUserTeam} userTeam={this.state.userTeam} currentUser={this.state.currentUser} /> } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;