import React, { Component } from 'react'

export class Homepage extends Component {
    state = {
        team: null,
        players: null
    }  

    componentDidMount(){
        fetch('http://localhost:3001/teams')
        .then(resp => resp.json())
        .then(data => this.setState({team: data.filter(team => team.user_id === this.props.currentUser.id)}))
        // this.props.getUserTeam(this.props.currentUser.id)
    }

    getTeamPlayers = (teamID) => {
        fetch('http://localhost:3001/players')
        .then(resp => resp.json())
        .then(data => this.setState({players: data.filter(player => player.team_id === teamID)}))
    }


    render() {
        // console.log('homepage props: ', this.props)
        console.log('homepage team', this.state.team)
        // console.log('homepage players: ', this.state.players)
        return (
            <div>
                <h1>Homepage</h1>
                <h2>User Team Name</h2>
                <h3>{this.props.currentUser.name}</h3>
                    <div className='teamStats'>
                        <p>Team stats here</p>
                    </div>
            </div>
        )
    }
}

export default Homepage