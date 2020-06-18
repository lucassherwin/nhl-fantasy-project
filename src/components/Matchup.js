import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export class Matchup extends Component {
    state = {
        userTotals: {
            goals: 0,
            assists: 0,
            ppg: 0,
            gwg: 0,
            pim: 0,
            points: 0,
            hits: 0,
            total: 0
        },
        npcTeam1Totals: {
            goals: 0,
            assists: 0,
            ppg: 0,
            gwg: 0,
            pim: 0,
            points: 0,
            hits: 0,
            total: 0
        },
        npcTeam2Totals: {
            goals: 0,
            assists: 0,
            ppg: 0,
            gwg: 0,
            pim: 0,
            points: 0,
            hits: 0,
            total: 0
        },
        winner: ''
    }

    getUserTeamTotals = () => {
        let goals = this.state.userTotals.goals;
        let assists = this.state.userTotals.assists;
        let ppg = this.state.userTotals.ppg;
        let gwg = this.state.userTotals.gwg;
        // let toi; //this is a string in the backend
        let pim = this.state.userTotals.pim;
        let points = this.state.userTotals.points;
        let hits = this.state.userTotals.hits;

        let total = this.state.userTotals.total

        this.props.userTeam.team.map((player) => (
            goals += player.goals,
            assists += player.assists,
            ppg += player.ppg,
            gwg += player.gwg,
            pim += player.pim,
            points += player.points,
            hits += player.hits,
            total += goals + assists + ppg + gwg + pim + points + hits
        ))
        this.setState({userTotals: {...this.state.userTotals, goals: goals, assists: assists, ppg: ppg, gwg: gwg, pim: pim, points: points, hits: hits, total: total}})

    }

    getNPCTeam1Totals = () => {
        let goals = this.state.npcTeam1Totals.goals;
        let assists = this.state.npcTeam1Totals.assists;
        let ppg = this.state.npcTeam1Totals.ppg;
        let gwg = this.state.npcTeam1Totals.gwg;
        // let toi; //this is a string in the backend
        let pim = this.state.npcTeam1Totals.pim;
        let points = this.state.npcTeam1Totals.points;
        let hits = this.state.npcTeam1Totals.hits;

        let total = this.state.npcTeam1Totals.total;

        this.props.npcTeam1.map((player) => (
            goals += player.goals,
            assists += player.assists,
            ppg += player.ppg,
            gwg += player.gwg,
            pim += player.pim,
            points += player.points,
            hits += player.hits,

            total += goals + assists + ppg + gwg + pim + points + hits
        ))
        this.setState({npcTeam1Totals: {...this.state.npcTeam1Totals, goals: goals, assists: assists, ppg: ppg, gwg: gwg, pim: pim, points: points, hits: hits, total: total}})
    }

    getNPCTeam2Totals = () => {
        let goals = this.state.npcTeam2Totals.goals;
        let assists = this.state.npcTeam2Totals.assists;
        let ppg = this.state.npcTeam2Totals.ppg;
        let gwg = this.state.npcTeam2Totals.gwg;
        // let toi; //this is a string in the backend
        let pim = this.state.npcTeam2Totals.pim;
        let points = this.state.npcTeam2Totals.points;
        let hits = this.state.npcTeam2Totals.hits;

        let total = this.state.npcTeam2Totals.total;

        this.props.npcTeam2.map((player) => (
            goals += player.goals,
            assists += player.assists,
            ppg += player.ppg,
            gwg += player.gwg,
            pim += player.pim,
            points += player.points,
            hits += player.hits,

            total += goals + assists + ppg + gwg + pim + points + hits
        ))
        this.setState({npcTeam2Totals: {...this.state.npcTeam2Totals, goals: goals, assists: assists, ppg: ppg, gwg: gwg, pim: pim, points: points, hits: hits, total: total}})
    }

    determineWinner = () => {
        if(this.state.userTotals.total > this.state.npcTeam1Totals.total && this.state.userTotals.total > this.state.npcTeam2Totals.total)
        {
            this.setState({winner: 'user1'})
        }
        else if(this.state.npcTeam1Totals.total > this.state.userTotals.total && this.state.npcTeam1Totals.total > this.state.npcTeam2Totals.total)
        {
            this.setState({winner: 'npcTeam1'})
        }
        else if(this.state.npcTeam2Totals.total > this.state.userTotals.total && this.state.npcTeam2Totals.total > this.state.npcTeam1Totals.total)
        {
            this.setState({winne: 'npcTeam2'})
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(prevState.userTotals.total !== this.state.userTotals.total || prevState.npcTeam1Totals.total !== this.state.npcTeam1Totals.total || prevState.npcTeam2Totals.total !== this.state.npcTeam2Totals.total)
        {
            this.determineWinner();
        }
    }

    componentDidMount() {
        this.getUserTeamTotals();
        this.getNPCTeam1Totals();
        this.getNPCTeam2Totals();

        this.determineWinner();

        console.log(this.state);
    }

    render() {
        let { npcTeam1, npcTeam2, currentUser, userTeam } = this.props
        const options = {
            animationEnabled: true,	
            title:{
                text: "Point Totals Per Team"
            },
            axisY : {
                title: "Total Points",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "column",
                name: "User",
                showInLegend: true,
                dataPoints: [
                    { y: this.state.userTotals.goals, label: "Goals" },
                    { y: this.state.userTotals.assists, label: "Assists" },
                    { y: this.state.userTotals.points, label: "Points" },
                    { y: this.state.userTotals.ppg, label: "Power Play Goals" },
                    { y: this.state.userTotals.gwg, label: "Game Winning Goals" },
                    { y: this.state.userTotals.pim, label: "Penalty Minutes" },
                    { y: this.state.userTotals.hits, label: "Hits" }
                ]
            },
            {
                type: "column",
                name: "NPCTeam1",
                showInLegend: true,
                dataPoints: [
                    { y: this.state.npcTeam1Totals.goals, label: "Goals" },
                    { y: this.state.npcTeam1Totals.assists, label: "Assists" },
                    { y: this.state.npcTeam1Totals.points, label: "Points" },
                    { y: this.state.npcTeam1Totals.ppg, label: "Power Play Goals" },
                    { y: this.state.npcTeam1Totals.gwg, label: "Game Winning Goals" },
                    { y: this.state.npcTeam1Totals.pim, label: "Penalty Minutes" },
                    { y: this.state.npcTeam1Totals.hits, label: "Hits" }
                ]
            },
            {
                type: "column",
                name: "NPCTeam2",
                showInLegend: true,
                dataPoints: [
                    { y: this.state.npcTeam2Totals.goals, label: "Goals" },
                    { y: this.state.npcTeam2Totals.assists, label: "Assists" },
                    { y: this.state.npcTeam2Totals.points, label: "Points" },
                    { y: this.state.npcTeam2Totals.ppg, label: "Power Play Goals" },
                    { y: this.state.npcTeam2Totals.gwg, label: "Game Winning Goals" },
                    { y: this.state.npcTeam2Totals.pim, label: "Penalty Minutes" },
                    { y: this.state.npcTeam2Totals.hits, label: "Hits" }
                ]
            }]
    }
        
        return (
            <div>
                <h1>Matchup page</h1>
                <h2>Current User: {currentUser.name}</h2>

                <h3>Current User Team: {this.state.userTotals.total}</h3>
                <ul>
                {userTeam.team.length !== 0 ? userTeam.team.map((player, index) => (
                    <li key={index}>{player.name}</li>
                )) : null}
                </ul>

                <h3>NPC Team 1: {this.state.npcTeam1Totals.total}</h3>
                <ul>
                {npcTeam1.length !== 0 ? npcTeam1.map((player, index) => (
                    <li key={index}>{player.name}</li>
                )) : null}
                </ul>

                <h3>NPC Team 2: {this.state.npcTeam2Totals.total}</h3>
                <ul>
                {npcTeam2.length !== 0 ? npcTeam2.map((player, index) => (
                    <li key={index}>{player.name}</li>
                )) : null}
                </ul>

                <h3>Winner: {this.state.winner}</h3>

                <div>
                    <CanvasJSChart options = {options} />
                </div>
            </div>
        )
    }
}

export default Matchup
