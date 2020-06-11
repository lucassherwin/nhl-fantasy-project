import React, { Component } from 'react';
import PlayerTeam from './PlayerTeam.js';
import CreateTeam from './CreateTeam.js';
import Timer from './Timer.js';

export class Homepage extends Component {
    state = {
        team: null,
        showTimer: false, //when true, show the timer and start the draft
        npcTeam1: [], //these will be the teams that the computer creates -> the players will be randomly selected from the available players during the countdown and added to the teams
        npcTeam2: [] 
    }  

    componentDidMount(){
        fetch('http://localhost:3001/teams')
        .then(resp => resp.json())
        .then(data => this.setState({team: data.filter(team => team.user_id === this.props.currentUser.id)}))
    }

    //starts the timer
    startTimer = () => {
        console.log('start timer');
        this.setState({showTimer: !this.state.showTimer})
    }

    render() {
        let { userTeam, createUserTeam } = this.props
        return (
            <div>
                <button onClick={this.startTimer}>Start Timer</button>
                {this.state.showTimer ? <Timer /> : null}
                <h1>Homepage</h1>
                <h2>User Team Name</h2>
                <h3>{this.props.currentUser.name}</h3>
                    <div className='teamStats'>
                        {/* <h2>{this.state.team.name}</h2> */}
                        <p>Team stats here</p>
                    </div>
                {this.state.team !== null ? <PlayerTeam setCurrentPlayer={this.props.setCurrentPlayer} team={this.state.team}
                userTeam={userTeam}/> : null }
                {console.log(this.state.team)}
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