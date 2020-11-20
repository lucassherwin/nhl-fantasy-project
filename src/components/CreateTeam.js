import React, { Component } from 'react'

export class CreateTeam extends Component {
    state = {
        name: '',
        location: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createUserTeam(event, this.state.name, this.state.location)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter a team name: <br />
                        <input type='text' name='teamname' placeholder='Team Name' onChange={this.handleChange}></input> <br />
                    </label>
                    <br />
                    <label>
                        Enter a team location: <br />
                        <input type='text' name='teamname' placeholder='Team Location' onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <input type='submit' name='createTeam' value='Create Team' />
                </form>
            </div>
        )
    }
}

export default CreateTeam
