import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Navbar extends Component {
    render() {
        const link = {
            width: '100px',
            padding: '12px',
            margin: '0 6px 6px',
            background: 'blue',
            textDecoration: 'none',
            color: 'white',
        }
        return (
            <div>
                    <NavLink to="/homepage" exact style={link} activeStyle={{background: 'darkblue'}}>HomePage</NavLink>
                    <NavLink to='/matchup' exact style={link} activeStyle={{background: 'darkblue'}}>Matchup</NavLink>
                    <NavLink to='/myteam' exact style={link} activeStyle={{background: 'darkblue'}}>My Team</NavLink>
                    <NavLink to="/login" exact style={link} activeStyle={{background: 'darkblue'}}>Log Out</NavLink>
            </div>
        )
    }
}

export default Navbar
