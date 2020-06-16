import React, { Component } from 'react'
// import PlayerPage from './PlayerPage.js'
import { NavLink } from 'react-router-dom'
import Timer from './Timer.js';
import Search from './Search.js';

export class PlayerTeam extends Component {
    state = {
        // players: null, //all of the available players
        // npcTeam1: [],
        // npcTeam2: [],
        showTimer: false,
        search: ''
    }

    componentDidMount(){
        this.props.getPlayers();
    }

    // draftPlayers = () => {
    //     // //when called choose 2 random players from this.state.players and add them to the npcTeams
    //     const randomPlayer1 = this.state.players[Math.floor(Math.random() * this.state.players.length)];
    //     const randomPlayer2 = this.state.players[Math.floor(Math.random() * this.state.players.length)];
    //     console.log('random player 1:', randomPlayer1)
    //     console.log('random player 2:', randomPlayer2)
        
    //     //npcTeam1
    //     let npc1 = this.state.npcTeam1;
    //     npc1.push(randomPlayer1)
    //     this.setState({npcTeam1: npc1})
    //     console.log('npcTeam1: ', this.state.npcTeam1)

    //     //npcTeam2
    //     let npc2 = this.state.npcTeam2;
    //     npc2.push(randomPlayer2)
    //     this.setState({npcTeam2: npc2})
    //     console.log('npcTeam2: ', this.state.npcTeam2)
    // }

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

    // componentDidMount() {
    //     let teamID = this.props.team[0].id
    //     // let teamID = 3
    //     fetch('http://localhost:3001/players')
    //     .then(resp => resp.json())
    //     .then(data => this.setState({players: data.filter(player => player.team_id === teamID)}))
    //     // this.props.getPlayers()
    // }

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