import React, { Component } from 'react'

export class MyTeam extends Component {
    state = {
        goals: 0,
        assists: 0,
        ppg: 0,
        gwg: 0,
        pim: 0,
        points: 0,
        hits: 0
    }

    getTeamTotals = () => {
        let goals = this.state.goals;
        let assists = this.state.assists;
        let ppg = this.state.ppg;
        let gwg = this.state.gwg;
        // let toi; //this is a string in the backend
        let pim = this.state.pim;
        let points = this.state.points;
        let hits = this.state.hits;

        this.props.userTeam.team.map((player) => (
            goals += player.goals,
            assists += player.assists,
            ppg += player.ppg,
            gwg += player.gwg,
            pim += player.pim,
            points += player.points,
            hits += player.hits
        ))
        this.setState({goals: goals, assists: assists, ppg: ppg, gwg: gwg, pim: pim, points: points, hits: hits})
    }

    componentDidMount() {
        this.getTeamTotals()
        console.log(this.state)
    }


    render() {
        return (
            <div>
                <h1>{this.props.currentUser.name}'s Team</h1>
                <div>
                <h2>Players:</h2>
                    <ul>
                        {this.props.userTeam.team.length !== 0 ? this.props.userTeam.team.map((player, index) => (
                            <li key={index}>{player.name}</li>
                        )) : null}
                    </ul>
                </div>
                <div>
                    <h2>Team Stats:</h2>
                            <ul>
                                <li>Goals: {this.state.goals}</li>
                                <li>Assists: {this.state.assists}</li>
                                <li>Points: {this.state.points}</li>
                                <li>Power Play Goals: {this.state.ppg}</li>
                                <li>Game Winning Goals: {this.state.gwg}</li>
                                <li>Penalty Minutes: {this.state.pim}</li>
                                <li>Hits: {this.state.hits}</li>
                            </ul>
                </div>
            </div>
        )
    }
}

export default MyTeam
