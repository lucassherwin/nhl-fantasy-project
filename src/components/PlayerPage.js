import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PlayerPage extends Component {
    render() {
        let {currentPlayer, addPlayerToUserTeam} = this.props
        const options = {
            title: {
                text: "Basic Column Chart in React"
            },
            data: [{				
                    type: "column",
                    dataPoints: [
                        { label: "Goals",  y: currentPlayer.goals  },
                        { label: "Assists", y: currentPlayer.assists  },
                        { label: "Power Player Goals", y: currentPlayer.ppg  },
                        // { label: "Time On Ice",  y: currentPlayer.toi  }, this is a string in the backend
                        { label: "Game Winning Goals",  y: currentPlayer.gwg  },
                        { label: "Penalty Minutes",  y: currentPlayer.pim  },
                        { label: "Points",  y: currentPlayer.points  },
                        { label: "Hits",  y: currentPlayer.hits  }
                    ]
            }]
        }

        
        
        return (
            <div>
                <h1>Player Page</h1>
                    <div>
                        <h2>
                            Goals: {currentPlayer.goals}
                        </h2>
                    </div>
                <h2>{currentPlayer.name}</h2>
                <button type='submit' onClick={() => addPlayerToUserTeam(currentPlayer)}>Add Player To Team</button>

                <div>
                    <CanvasJSChart options = {options} /* onRef = {ref => this.chart = ref} *//>
                </div>
            </div>
        )
    }
}

export default PlayerPage