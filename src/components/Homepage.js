import React, { Component } from 'react'
import PlayerTeam from './PlayerTeam.js'

export class Homepage extends Component {
    state = {
        team: null,
        players: null
    }  

    componentDidMount(){
        fetch('http://localhost:3001/teams')
        .then(resp => resp.json())
        .then(data => this.setState({team: data.filter(team => team.user_id === this.props.currentUser.id)}))
    }

    render() {
        let { userTeam } = this.props
        console.log('in homepage ', this.props)
        return (
            <div>
                <h1>Homepage</h1>
                <h2>User Team Name</h2>
                <h3>{this.props.currentUser.name}</h3>
                    <div className='teamStats'>
                        {/* <h2>{this.state.team.name}</h2> */}
                        <p>Team stats here</p>
                    </div>
                {this.state.team !== null ? <PlayerTeam setCurrentPlayer={this.props.setCurrentPlayer} team={this.state.team}
                userTeam={userTeam}/> : null }
            </div>
        )
    }
}

export default Homepage