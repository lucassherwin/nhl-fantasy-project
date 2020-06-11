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
        return (
            <div>
                <form>
                    <label>
                        Team Name:
                        <input type='text' name='teamname' placeholder='Enter a name for your team' onChange={(event) => this.handleName(event)}></input>
                    </label>
                    <label>
                        Location:
                        <input type='text' name='teamname' placeholder='Enter the location of your team' onChange={(event) => this.handleLocation(event)}></input>
                    </label>
                    <input type='submit' name='createTeam' placeholder='Create Team' onClick={(event) => this.handleSubmit(event)}></input>
                </form>
            </div>
        )
    }
}

export default CreateTeam
