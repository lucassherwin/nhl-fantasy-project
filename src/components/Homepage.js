import React, { Component } from 'react'

export class Homepage extends Component {
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <h2>User Team Name</h2>
                <h3>{this.props.user.username}</h3>
                    <div className='teamStats'>
                        <p>Team stats here</p>
                    </div>
            </div>
        )
    }
}

export default Homepage