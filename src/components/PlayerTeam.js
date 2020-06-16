import React, { Component } from 'react'
// import PlayerPage from './PlayerPage.js'
import { NavLink } from 'react-router-dom'
import Timer from './Timer.js';
import Search from './Search.js';

export class PlayerTeam extends Component {
    state = {
        showTimer: false,
        search: ''
    }

    componentDidMount(){
        this.props.getPlayers();
    }

    //starts the timer
    startTimer = () => {
        console.log('start timer');
        this.setState({showTimer: !this.state.showTimer})
    }

    handleSearch = (event) => {
        console.log('search: ', event.target.value)

        let { name, value } = event.target;
        this.setState({[name]: value})
    }

    render() {
        let {setCurrentPlayer, userTeam} = this.props

        let filterPlayers = this.props.players !== null ? this.props.players.filter((filterPlayers) => {return filterPlayers.name.indexOf(this.state.search) !== -1}) : null

        return (
            <div>
                <h1>Available Players</h1>
                <button onClick={this.startTimer}>Start Draft</button>

                <Search search={this.state.search} handleSearch={this.handleSearch} />
                
                {this.state.showTimer ? <Timer availablePlayers={this.state.availablePlayers} draftPlayers={this.props.draftPlayers}/> : null}
                <div>
                    <ul>
                        {this.props.players !== null ? filterPlayers.map((player, index) => (
                            userTeam.team.some(p => p.name === player.name) ? null :
                            <li key={index} onClick={() => setCurrentPlayer(player)}>
                            <NavLink to={`playerPage/${player.id}` }>{player.name}</NavLink></li>))
                            : null}
                    </ul>
                </div>
                <h2>NPC Team 1:</h2>
                <ul>
                {this.props.npcTeam1.length !== 0 ? this.props.npcTeam1.map((player, index) => (
                    <li key={index}>{player.name}</li>
                )) : null}
                </ul>

                <h2>NPC Team 2:</h2>
                <ul>
                {this.props.npcTeam2.length !== 0 ? this.props.npcTeam2.map((player, index) => (
                    <li key={index}>{player.name}</li>
                )) : null}
                </ul>
            </div>
        )
    }
}

export default PlayerTeam