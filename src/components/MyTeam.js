import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
        // console.log(this.state)
    }


    render() {
        const options = {
            title: {
                text: "Player Data Chart"
            },
            data: [{				
                    type: "column",
                    dataPoints: [
                        { label: "Goals",  y: this.state.goals  },
                        { label: "Assists", y: this.state.assists  },
                        { label: "Power Player Goals", y: this.state.ppg  },
                        // { label: "Time On Ice",  y: this.state.toi  }, this is a string in the backend
                        { label: "Game Winning Goals",  y: this.state.gwg  },
                        { label: "Penalty Minutes",  y: this.state.pim  },
                        { label: "Points",  y: this.state.points  },
                        { label: "Hits",  y: this.state.hits  }
                    ]
            }]
        }
        return (
            <div>
                <h1>{this.props.userTeam.name}</h1>
                <div>
                {this.props.userTeam.team.length !== 0 ? <h2>Players:</h2> : null}
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
                                {/* <li>Time On Ice: {this.state.toi}</li> */}
                                <li>Hits: {this.state.hits}</li>
                            </ul>
                </div>
                <div>
                    <CanvasJSChart options = {options} />
                </div>
            </div>
        )
    }
}

export default MyTeam
