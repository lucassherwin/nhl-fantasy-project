import React, { Component } from 'react';
// import CreateTeam from './CreateTeam.js';
// import Draft from './Draft.js';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Timer from './Timer.js';

export class Homepage extends Component {
    state = {
        showTimer: false, //when true, show the timer and start the draft
        allPlayers: null, // all players
        search: ''
    }

    componentDidMount() {
        // console.log(this.props.userTeam)
        axios.get('http://localhost:3001/players')
        .then(resp => this.setState({allPlayers: resp.data}))
    }

    handleSearch = (event) => {
        console.log('search: ', event.target.value)

        let { name, value } = event.target;
        this.setState({[name]: value})
    }

    draftPlayers = () => {
        // when called choose 2 random players from this.state.allPlayers and add them to the npcTeams
        const randomPlayer1 = this.state.allPlayers[Math.floor(Math.random() * this.state.allPlayers.length)];
        const randomPlayer2 = this.state.allPlayers[Math.floor(Math.random() * this.state.allPlayers.length)];
        console.log('random player 1:', randomPlayer1)
        console.log('random player 2:', randomPlayer2)
        
        this.props.setNPCTeams(randomPlayer1, randomPlayer2)
    }

    startTimer = () => {
        console.log('start timer');
        this.setState({showTimer: !this.state.showTimer})
    }

    render() {
        // this works for now -> improve on this
        let filterPlayers = this.state.allPlayers !== null ? this.state.allPlayers.filter((filterPlayers) => {return filterPlayers.name.indexOf(this.state.search) !== -1}) : null

        return (
            <div>
                <div>
                    <h1>Homepage</h1>
                    <h2>Username: {this.props.currentUser.username}</h2>
                    <h2>Team Name: {this.props.userTeam.isCreated ? this.props.userTeam.name : null}</h2>
                    <Timer draftPlayers={this.draftPlayers} />
                </div>
                <div>
                    <h2>Players</h2>
                    <input type='text' placeholder='Search All Players' name='search' value={this.search} onChange={this.handleSearch} />
                    <ul>
                        {this.state.allPlayers !== null ? filterPlayers.map((player) => (
                            <li key={player.id}><NavLink to={`playerPage/${player.id}`} onClick={() => this.props.setCurrentPlayer(player)}>{player.name}</NavLink></li>
                        )) : null}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Homepage

/*
TODO:
- Look into updating the list of players
    - Possibly change from NavLink's to using redirect
- Draft
    - Remove Draft component and implement features on homepage
*/