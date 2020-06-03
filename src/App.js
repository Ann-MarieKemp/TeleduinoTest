import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import APIKey from '../src/secrets.js';

class App extends Component {
  constructor() {
    super();
    this.turnOnHandler = this.turnOnHandler.bind(this);
    this.turnOffHandler = this.turnOffHandler.bind(this);
    this.state = {
      pin: 0,
    };
  }
  componentDidMount(color) {
    let pins = [5, 6, 9];
    pins.forEach(async (pinNumber) => {
      await axios.post(
        `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=definePinMode&pin=${pinNumber}&mode=1`
      );
    });
  }
  async turnOnHandler(color) {
    if (color === 'red') {
      this.setState({ pin: 5 });
    } else if (color === 'blue') {
      this.setState({ pin: 6 });
    } else if (color === 'green') {
      this.setState({ pin: 9 });
    }
    console.log('this is turn on');
    let res = await axios.post(
      `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setDigitalOutput&pin=${this.state.pin}&output=1`
    );
    console.log(res);
  }

  async turnOffHandler(color) {
    if (color === 'red') {
      this.setState({ pin: 5 });
    } else if (color === 'blue') {
      this.setState({ pin: 6 });
    } else if (color === 'green') {
      this.setState({ pin: 9 });
    }
    console.log('this is turn off');
    let res = await axios.post(
      `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setDigitalOutput&pin=${this.state.pin}&output=0`
    );
    console.log(res, 'output');
  }
  render() {
    return (
      <div className="App">
        <button onClick={() => this.turnOnHandler('red')}>Turn On Red</button>
        <button onClick={() => this.turnOnHandler('blue')}>Turn On Blue</button>
        <button onClick={() => this.turnOnHandler('green')}>
          Turn On Green
        </button>
        <button onClick={() => this.turnOffHandler('red')}>Turn Off Red</button>
        <button onClick={() => this.turnOffHandler('blue')}>
          Turn Off Blue
        </button>
        <button onClick={() => this.turnOffHandler('green')}>
          Turn Off Green
        </button>
      </div>
    );
  }
}

export default App;
