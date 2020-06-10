import React, { Component } from 'react'

export class PlayerPage extends Component {
    render() {
        return (
            <div>
                <h1>Player Page</h1>
                <h2>{this.props.currentPlayer.name}</h2>

                <button onClick={() => this.props.addPlayerToUserTeam(this.props.currentPlayer)}>Add Player To Team</button>
            </div>
        )
    }
}

export default PlayerPage

/*
for mvp:
add button to add player to team
have state in playerTEam that is the users team
add players to this team
display on playerTeam in seperate list
*/

/*
IF ALL ELSE FAILS
PUT A STATE IN PLAYERTEAM THAT HAS THE CURRENTTEAM AND PUT BUTTONS NEXT TO EACH PLAYER
ONCLICK ADD THAT PLAYER TO THE OTHER LIST

THIS IS NOT HOW IT WILL WORK IN THE FINAL BUT IT WILL GET YOU CLOSER TO MVP
*/