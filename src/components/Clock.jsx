// import { useEffect } from 'react';
import { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date() // Initialize the time in state
    };
  }

  // Set the interval when the component mounts
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        time: new Date() // Update the time every second
      });
    }, 1000);
  }

  // Clear the interval when the component unmounts
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="clock">
        {/* Hour hand */}
        <div
          className="hour_hand"
          style={{
            transform: `rotateZ(${this.state.time.getHours() * 30}deg)`
          }}
        />
        {/* Minute hand */}
        <div
          className="min_hand"
          style={{
            transform: `rotateZ(${this.state.time.getMinutes() * 6}deg)`
          }}
        />
        {/* Second hand */}
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${this.state.time.getSeconds() * 6}deg)`
          }}
        />
        {/* Clock face markers */}
        <span className="twelve">12</span>
        <span className="one">1</span>
        <span className="two">2</span>
        <span className="three">3</span>
        <span className="four">4</span>
        <span className="five">5</span>
        <span className="six">6</span>
        <span className="seven">7</span>
        <span className="eight">8</span>
        <span className="nine">9</span>
        <span className="ten">10</span>
        <span className="eleven">11</span>
      </div>
    );
  }
}

export default Clock;