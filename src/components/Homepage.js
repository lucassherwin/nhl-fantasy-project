import React, { Component } from 'react';
import PlayerTeam from './PlayerTeam.js';
import CreateTeam from './CreateTeam.js';
import Draft from './Draft.js';

export class Homepage extends Component {
    state = {
        team: null, //team obj from backend
        showTimer: false, //when true, show the timer and start the draft
        availablePlayers: null //players in PlayerTeam
    }  

    componentDidMount(){
        fetch('http://localhost:3001/teams')
        .then(resp => resp.json())
        .then(data => this.setState({team: data.filter(team => team.user_id === this.props.currentUser.id)}))
    }

    draftPlayers = () => {
        // //when called choose 2 random players from this.state.players and add them to the npcTeams
        const randomPlayer1 = this.state.availablePlayers[Math.floor(Math.random() * this.state.availablePlayers.length)];
        const randomPlayer2 = this.state.availablePlayers[Math.floor(Math.random() * this.state.availablePlayers.length)];
        console.log('random player 1:', randomPlayer1)
        console.log('random player 2:', randomPlayer2)
        
        this.props.setNPCTeams(randomPlayer1, randomPlayer2)
    }

    startTimer = () => {
        console.log('start timer');
        this.setState({showTimer: !this.state.showTimer})
    }

    getPlayers = () => {
        //gets all the available players from backend
        let teamID = this.state.team[0].id
        fetch('http://localhost:3001/players')
        .then(resp => resp.json())
        .then(data => this.setState({availablePlayers: data.filter(player => player.team_id === teamID)}))
    }

    render() {
        let { userTeam, createUserTeam } = this.props

        return (
            <div>
                {/* <button onClick={this.startTimer}>Start Timer</button>
                {this.state.showTimer ? <Timer /> : null} */}
                <h1>Homepage</h1>
                {this.state.showTimer ? <Draft /> : null}
                <h2>User Team Name</h2>
                <h3>{this.props.currentUser.name}</h3>
                    <div className='teamStats'>
                        <p>Team stats here</p>
                    </div>

                {this.state.team !== null ? <PlayerTeam draftPlayers={this.draftPlayers} players={this.state.availablePlayers} getPlayers={this.getPlayers}
                setAvailablePlayers={this.setAvailablePlayers} team={this.state.team}
                setCurrentPlayer={this.props.setCurrentPlayer} userTeam={userTeam}
                npcTeam1={this.props.npcTeam1} npcTeam2={this.props.npcTeam2}/> : null }
                <div>
                    <h1>User Team</h1>
                    <h2>{userTeam.name !== '' ? userTeam.name : null}</h2>
                    <h3>{userTeam.location !== '' ? userTeam.location : null}</h3>
                    <div>
                        <ul>
                            {userTeam.team.length !== 0 ? userTeam.team.map((player, index) => (
                                <li key={index}>{player.name}</li>
                            )) : <CreateTeam createUserTeam={createUserTeam}/>}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage