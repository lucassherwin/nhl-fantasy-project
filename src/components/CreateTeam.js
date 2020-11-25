import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

export class CreateTeam extends Component {
    state = {
        name: null,
        location: null,
        redirect: null
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    // not the most elegant solution but it works for now
    handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`http://localhost:3001/teams`, {
            name: this.state.name,
            location: this.state.location,
            user_id: this.props.currentUser.userID
        })
        .then(resp => this.props.createUserTeam(event, resp.data.name, resp.data.location), this.setState({redirect: '/myteam'}))
        // this.props.createUserTeam(event, this.state.name, this.state.location)
    }

    render() {
        // condition to redirect based on data returned from backend
        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter a team name: <br />
                        <input type='text' name='name' placeholder='Team Name' onChange={this.handleChange}></input> <br />
                    </label>
                    <br />
                    <label>
                        Enter a team location: <br />
                        <input type='text' name='location' placeholder='Team Location' onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <input type='submit' name='createTeam' value='Create Team' />
                </form>
            </div>
        )
    }
}

export default CreateTeam
