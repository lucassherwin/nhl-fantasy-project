import React, { Component } from 'react'
// import PlayerPage from './PlayerPage.js'
import { NavLink } from 'react-router-dom'

export class PlayerTeam extends Component {
    state = {
        players: null
    }

    componentDidMount() {
        let teamID = this.props.team[0].id
        fetch('http://localhost:3001/players')
        .then(resp => resp.json())
        .then(data => this.setState({players: data.filter(player => player.team_id === teamID)}))
    }

    //userTeam = user team obj with name and location and list of players
    //userTeam.team = players selected by the user

    render() {
        let {setCurrentPlayer, userTeam} = this.props
        return (
            <div>
                <h1>Available Players</h1>
                {console.log('playerTeam players:', this.state.players)}
                <div>
                    <ul>
                        {this.state.players !== null ? this.state.players.map((player, index) => (
                            userTeam.team.some(p => p.name === player.name) ? null : <li key={index} onClick={() => setCurrentPlayer(player)}><NavLink to={`playerPage/${player.id}` }>{player.name}</NavLink></li>)) : null}
                    </ul>
                </div>
            </div>
        )
    }
}

export default PlayerTeam