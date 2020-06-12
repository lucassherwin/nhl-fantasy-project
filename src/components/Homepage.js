import React, { Component } from 'react';
import PlayerTeam from './PlayerTeam.js';
import CreateTeam from './CreateTeam.js';
import Timer from './Timer.js';
import Draft from './Draft.js';

export class Homepage extends Component {
    state = {
        team: null, //team obj from backend
        showTimer: false, //when true, show the timer and start the draft
        draftedPlayers: [],
        availablePlayers: null
    }  

    componentDidMount(){
        fetch('http://localhost:3001/teams')
        .then(resp => resp.json())
        .then(data => this.setState({team: data.filter(team => team.user_id === this.props.currentUser.id)}))
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
                {this.state.team !== null ? <PlayerTeam setAvailablePlayers={this.setAvailablePlayers} team={this.state.team} setCurrentPlayer={this.props.setCurrentPlayer} userTeam={userTeam}
                npcTeam1={this.state.npcTeam2} npcTeam2={this.state.npcTeam2}/> : null }
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
                <div>
                    {/* <h1>NPC Team1</h1>
                    <div>
                        <ul>
                            {this.state.npcTeam1.length !== 0 ? this.state.npcTeam1.map((player, index) => (
                                <li key={index}>{player.name}</li>
                            )) : null}
                        </ul>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Homepage