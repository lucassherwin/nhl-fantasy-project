import React, { Component } from 'react'

export class CreateTeam extends Component {
    state = {
        name: '',
        location: ''
    }

    handleName = (event) => {
        this.setState({name: event.target.value})
        console.log(event.target.value)
    }

    handleLocation = (event) => {
        this.setState({location: event.target.value})
        console.log(event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createUserTeam(event, this.state.name, this.state.location)
    }

    render() {
        let rightAlign = {
            position: 'absolute',
            right: '0px',
            width: '300px',
            padding: '10px'
        }
        return (
            <div>
                <form>
                    <label>
                        Enter a team name: <br />
                        <input type='text' name='teamname' placeholder='Team Name' onChange={(event) => this.handleName(event)}></input> <br />
                    </label>
                    <br />
                    <label>
                        Enter a team location: <br />
                        <input type='text' name='teamname' placeholder='Team Location' onChange={(event) => this.handleLocation(event)}></input>
                    </label>
                    <br />
                    <input type='submit' name='createTeam' placeholder='Create Team' onClick={(event) => this.handleSubmit(event)}></input>
                </form>
            </div>
        )
    }
}

export default CreateTeam
