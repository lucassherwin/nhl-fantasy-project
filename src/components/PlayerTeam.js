import React, { Component } from 'react'
// import PlayerPage from './PlayerPage.js'
import { NavLink } from 'react-router-dom'

export class PlayerTeam extends Component {
    state = {
        players: null,
        playerTeam: null
    }

    componentDidMount() {
        let teamID = this.props.team[0].id
        fetch('http://localhost:3001/players')
        .then(resp => resp.json())
        .then(data => this.setState({players: data.filter(player => player.team_id === teamID)}))
    }

    setPlayersState = () => {
        this.setState({playerTeam: this.props.userTeam})
        console.log('playerTeam:', this.state.playerTeam)
    }

    render() {
        let {setCurrentPlayer, userTeam} = this.props
        return (
            <div>
                <h1>Available Players</h1>
                <div>
                    <ul>
                    {console.log('playerTeam user team', userTeam)}
                        {this.state.players !== null ? this.state.players.map((player, index) => (
                            userTeam.some(p => p.name === player.name) ? null : <li key={index} onClick={() => setCurrentPlayer(player)}><NavLink to={`playerPage/${player.id}` }>{player.name}</NavLink></li>)) : null}
                    </ul>
                </div>
                <h1>User Team</h1>
                <div>
                    <ul>
                        {userTeam.length !== 0 ? userTeam.map((player, index) => (
                            <li key={index}>{player.name}</li>
                        )) : null}
                    </ul>
                </div>
            </div>
        )
    }
}

export default PlayerTeam