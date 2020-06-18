import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

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
        let inputWidth = { width: '50%' }
        return (
            // <div>
            //     <h1>Login Page</h1>
            //     <div>
            //         <form>
            //             <label>
            //                 Username:
            //                 <input type='text' name='username' onChange={(event) => this.handleUsername(event)}/>
            //             </label>
            //             <label>
            //                 Password:
            //                 <input type='password' name='password' onChange={(event) => this.handlePassword(event)}/>
            //             </label>
            //             <input type='submit' name='login' value='Login' onClick={(event) => this.handleSubmit(event)} />
            //         </form>
            //     </div>
            //     <NavLink exact to='/signup'>Sign Up</NavLink>
            // </div>

            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(event) => this.handleUsername(event)} style={inputWidth}/>
                        <Form.Text className="text-muted">
                        Enter your username
                        </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => this.handlePassword(event)} style={inputWidth} />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" />
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
                                        <Form.Control type="text" placeholder="First Name" style={inputWidth}/>
                                        <Form.Label>Last Name: </Form.Label>
                                        <Form.Control type="text" placeholder="Last Name" style={inputWidth}/>
                                        
                                        <Form.Label>Create A Username:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" onChange={(event) => this.handleUsername(event)} style={inputWidth}/>
                                        <Form.Text className="text-muted">
                                        Username
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Create A Password:</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(event) => this.handlePassword(event)} style={inputWidth} />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" >
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
