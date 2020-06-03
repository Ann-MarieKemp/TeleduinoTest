import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import APIKey from '../src/secrets.js';

class App extends Component {
  constructor() {
    super();
    this.turnOnHandler = this.turnOnHandler.bind(this);
    this.turnOffHandler = this.turnOffHandler.bind(this);
    this.pinColor = this.pinColor.bind(this);
    this.turnOnColorAndValue = this.turnOnColorAndValue.bind(this);
    this.turnOffAll = this.turnOffAll.bind(this);
    this.turnOnRandom = this.turnOnRandom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      color: 'red',
      value: '255',
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
  pinColor(color) {
    let pin = 0;
    if (color === 'red') {
      console.log('inredoff', pin);
      pin = 5;
    } else if (color === 'blue') {
      pin = 6;
      console.log('inblueoff', pin);
    } else if (color === 'green') {
      pin = 9;
      console.log('ingreenoff', pin);
    }
    return pin;
  }
  async turnOnHandler(color) {
    let pin = this.pinColor(color);
    console.log('this is turn on', color, pin);
    let res = await axios.post(
      `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setDigitalOutput&pin=${pin}&output=1`
    );
    console.log(res);
  }

  async turnOffHandler(color) {
    let pin = this.pinColor(color);
    console.log('this is turn off', color, pin);
    let res = await axios.post(
      `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setDigitalOutput&pin=${pin}&output=0`
    );
    console.log(res, 'output');
  }
  async turnOnColorAndValue(color, value) {
    let pin = this.pinColor(color);
    await axios.post(
      `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setPwmOutput&pin=${pin}&output=${value}`
    );
  }
  turnOnRandom() {
    let colors = ['red', 'green', 'blue'];
    let randomColor = colors[Math.floor(Math.random() * 3)];
    console.log(randomColor);
    let randomValue = Math.floor(Math.random() * 255);
    console.log(randomValue);
    this.turnOnColorAndValue(randomColor, randomValue);
  }
  turnOffAll() {
    this.turnOffHandler('blue');
    this.turnOffHandler('green');
    this.turnOffHandler('red');
  }
  handleSubmit(e) {
    e.preventDefault();
    this.turnOnColorAndValue(this.state.color, this.state.value);
  }
  handleChange(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <button className="red" onClick={() => this.turnOnHandler('red')}>
          Turn On Red
        </button>
        <button className="blue" onClick={() => this.turnOnHandler('blue')}>
          Turn On Blue
        </button>
        <button className="green" onClick={() => this.turnOnHandler('green')}>
          Turn On Green
        </button>
        <button className="red" onClick={() => this.turnOffHandler('red')}>
          Turn Off Red
        </button>
        <button className="blue" onClick={() => this.turnOffHandler('blue')}>
          Turn Off Blue
        </button>
        <button className="green" onClick={() => this.turnOffHandler('green')}>
          Turn Off Green
        </button>
        <button onClick={this.turnOnRandom}>Turn On Random Color</button>
        <button onClick={this.turnOffAll}>Turn Off All Colors</button>
        <form onSubmit={this.handleSubmit}>
          <select
            name="color"
            value={this.state.color}
            onChange={this.handleChange}
          >
            Color
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
          </select>
          <label>Value</label>
          <input
            name="value"
            type="number"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
