import React, {Component, useImperativeHandle} from 'react';
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
import axios from 'axios';

class App extends Component {
  state = {
    loggedIn: false,
    redirect: null,
    currentUser: null,
    currentPlayer: null,
    userTeam: null,
    npcTeam1: [],
    npcTeam2: [],
  }

  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const username = rememberMe ? localStorage.getItem('user') : '';
    const userID = rememberMe ? localStorage.getItem('userID') : '';
    this.setState({currentUser: {...this.state.currentUser, username, rememberMe, userID}});
    this.setState({loggedIn: rememberMe});
  }

  logOut = () => {
    this.setState({loggedIn: false, currentUser: null, userTeam: null});
  }

  logIn = async(username, rememberMe) => {
    // get the user
    let user = await this.getUser(username);
    // get all the teams
    let teams = await this.getTeams();
    teams = teams.data
    // find the team with the correct user_id
    let team = teams.find(team => team.team.user_id === user.data.id);
    
    // set local storage
    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('user', rememberMe ? username : '');
    localStorage.setItem('userID', rememberMe ? user.data.id : '');

    // set state
    this.setState({currentUser: user.data});
    this.setState({userTeam: team});
    this.setState({loggedIn: true});
  }

  getUser = (username) => {
    return axios.post('http://localhost:3001/login', {username})
  }

  getTeams = () => {
    return axios.get('http://localhost:3001/teams')
  }

  setCurrentPlayer = (player) => {
    this.setState({currentPlayer: player})
  }

  savePlayer = () => {
    return axios.post('http://localhost:3001/player_team', {
      team_id: this.state.userTeam.team.id,
      player_id: this.state.currentPlayer.id
    })
  }

  addPlayerToUserTeam = async (player) => {
    // add player in backend
    let data = await this.savePlayer();
    // get the updated userTeam and update in state
    let teams = await this.getTeams();
    let userTeam = teams.data.find(team => team.team.user_id === this.state.currentUser.id)
    this.setState({userTeam})
    alert(`${player.name} has been added to your team`)
  }

  createUserTeam = (teamData) => {
    this.setState({userTeam: teamData})
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
        {this.state.loggedIn ? <Navbar logOut={this.logOut} /> : null}
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
            <Route exact path='/login'>{this.state.loggedIn ? <Redirect to={{pathname:'/homepage'}} /> : <Login logIn={this.logIn}/>}</Route>
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