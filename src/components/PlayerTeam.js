import React, { Component } from 'react'
// import PlayerPage from './PlayerPage.js'
import { NavLink } from 'react-router-dom'
import Timer from './Timer.js';

export class PlayerTeam extends Component {
    state = {
        players: null, //all of the available players
        npcTeam1: [],
        npcTeam2: [],
        showTimer: false
    }

    draftPlayers = () => {
        // //when called choose 2 random players from this.state.players and add them to the npcTeams
        const randomPlayer1 = this.state.players[Math.floor(Math.random() * this.state.players.length)];
        const randomPlayer2 = this.state.players[Math.floor(Math.random() * this.state.players.length)];
        console.log('random player 1:', randomPlayer1)
        console.log('random player 2:', randomPlayer2)
    }

    //starts the timer
    startTimer = () => {
        console.log('start timer');
        this.setState({showTimer: !this.state.showTimer})
    }

    componentDidMount() {
        let teamID = this.props.team[0].id
        // let teamID = 3
        fetch('http://localhost:3001/players')
        .then(resp => resp.json())
        .then(data => this.setState({players: data.filter(player => player.team_id === teamID)}))
    }

    render() {
        let {setCurrentPlayer, userTeam} = this.props
        return (
            <div>
                <h1>Available Players</h1>
                <button onClick={this.startTimer}>Start Timer</button>
                {this.state.showTimer ? <Timer availablePlayers={this.state.players} draftPlayers={this.draftPlayers}/> : null}
                <div>
                    <ul>
                        {this.state.players !== null ? this.state.players.map((player, index) => (
                            userTeam.team.some(p => p.name === player.name) ? null :
                            <li key={index} onClick={() => setCurrentPlayer(player)}>
                            <NavLink to={`playerPage/${player.id}` }>{player.name}</NavLink></li>))
                            : null}
                    </ul>
                </div>
            </div>
        )
    }
}

export default PlayerTeam