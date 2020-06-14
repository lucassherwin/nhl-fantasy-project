import React, { Component } from 'react'

export class Draft extends Component {
    state = {
        draftPlayers: false
    }

    startDraft = () => {
        this.setState({draftPlayers: !this.state.draftPlayers})
    }

    choosePlayer = () => {
        console.log('choose player')
    }

    componentDidMount(){
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <h1>This is the draft page</h1>
                {this.state.draftPlayers ? this.choosePlayer : null}
            </div>
        )
    }
}

export default Draft
