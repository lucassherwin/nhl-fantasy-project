import React, { Component } from 'react'

export class PlayerPage extends Component {
    render() {
        return (
            <div>
                <h1>Player Page</h1>
                <h2>{this.props.currentPlayer.name}</h2>
                <button type='submit' onClick={() => this.props.addPlayerToUserTeam(this.props.currentPlayer)}>Add Player To Team</button>
            </div>
        )
    }
}

export default PlayerPage