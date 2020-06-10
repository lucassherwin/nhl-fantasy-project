import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom';

export class Login extends Component {
    state = {
        user: {
            username: null,
            password: null
        }
    }

    handleUsername = (event) => {
        this.setState({user: {...this.state.user, username: event.target.value}})
        console.log(event.target.value)
    }

    handlePassword = (event) => {
        this.setState({user: {...this.state.user, password: event.target.value}})
        console.log(event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.logIn(this.state.user)

        console.log('log in')
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <div>
                    <form>
                        <label>
                            Username:
                            <input type='text' name='username' onChange={(event) => this.handleUsername(event)}/>
                        </label>
                        <label>
                            Password:
                            <input type='password' name='password' onChange={(event) => this.handlePassword(event)}/>
                        </label>
                        <input type='submit' name='login' value='Login' onClick={(event) => this.handleSubmit(event)} />
                    </form>
                </div>
                <NavLink exact to='/signup'>Sign Up</NavLink>
            </div>
        )
    }
}

export default Login
