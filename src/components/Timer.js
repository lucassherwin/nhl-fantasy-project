import React, { Component } from 'react'

export class Timer extends Component {
    constructor() {
        super();

        this.state = {
            seconds: 5 //seconds remaining
        };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    
    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds
        });
        
        // Check if we're at zero.
        if (seconds === 0) { 
            clearInterval(this.timer);
        }
    }
    
    render() {
        return(
            <div>
                <button onClick={this.startTimer}>Start</button>
                s: {this.state.seconds}
            </div>
        );
    }
}

export default Timer

// source:
// https://stackoverflow.com/questions/40885923/countdown-timer-in-react