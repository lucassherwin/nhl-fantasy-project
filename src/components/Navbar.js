import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

export default function Navbar({ logOut }) {
    return (
        <div>
            <Nav variant="pills" defaultActiveKey="/homepage">
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/homepage" exact>Homepage</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/matchup" exact>Matchup</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/myteam" exact>My Team</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/createteam" exact>Create Team</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/login" exact onClick={logOut}>Log Out</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
