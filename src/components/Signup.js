import React, { Component } from 'react'

export class Signup extends Component {
    state = {
        newUser: {
            name: ''
        }
    }
    
    newUser = (name) => {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            header: {
                'Accepts': "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: this.state.newUser.name})
        })
    }


    render() {
        return (
            <div>
                <h1>Sign up!</h1>
            </div>
        )
    }
}

export default Signup
