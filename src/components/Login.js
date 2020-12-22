import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { Redirect } from "react-router-dom";

export class Login extends Component {
    state = {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        redirect: null,
        rememberMe: false
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.logIn(this.state.username)

        console.log('log in')
    }

    handleSingup = (event) => {
        console.log(event.target.value, event.target.name);
        this.setState({[event.target.name]: event.target.value});
    }

    handleSignupSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/signup', {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        })
        .then(resp => console.log(resp.data), this.setState({redirect: '/login'}));
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect} />
        }
        let inputWidth = { width: '25%' }
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name='username' onChange={this.handleChange} style={inputWidth}/>
                        <Form.Text className="text-muted">
                        Enter your username
                        </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleChange} style={inputWidth} />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" name='rememberMe' label="Remember Me" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(event) => this.handleSubmit(event)} >
                Submit
                </Button>
                </Form>


                <Accordion defaultActiveKey="1">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Sign Up!
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>First Name: </Form.Label>
                                        <Form.Control type="text" placeholder="First Name" name='firstName' style={inputWidth} onChange={this.handleSingup} />
                                        <Form.Label>Last Name: </Form.Label>
                                        <Form.Control type="text" placeholder="Last Name" name='lastName' style={inputWidth} onChange={this.handleSingup} />
                                        
                                        <Form.Label>Create A Username:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" name='username' onChange={this.handleSingup} style={inputWidth}/>
                                        <Form.Text className="text-muted">
                                        Username
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Create A Password:</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleSignup} style={inputWidth} />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" onClick={this.handleSignupSubmit}>
                                    Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

export default Login
