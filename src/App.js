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
    this.rgbColorVal = this.rgbColorVal.bind(this);
    this.state = {
      color: 'red',
      value: '255',
      colorVal: '',
    };
  }
  rgbColorVal(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(result);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
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
      pin = 5;
    } else if (color === 'blue') {
      pin = 6;
    } else if (color === 'green') {
      pin = 9;
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
    await axios.post(
      `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setDigitalOutput&pin=${pin}&output=0`
    );
  }
  async turnOnColorAndValue(color, value) {
    let pin = this.pinColor(color);
    let res = await axios.post(
      `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setPwmOutput&pin=${pin}&output=${value}`
    );
    console.log(res);
  }
  turnOnRandom() {
    let colors = ['red', 'green', 'blue'];
    let randomColor = colors[Math.floor(Math.random() * 3)];
    let randomValue = Math.floor(Math.random() * 255);
    this.turnOnColorAndValue(randomColor, randomValue);
  }
  async turnOffAll() {
    await axios.all([
      axios.post(
        `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setDigitalOutput&pin=5&output=0`
      ),
      axios.post(
        `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setDigitalOutput&pin=6&output=0`
      ),
      await axios.post(
        `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setDigitalOutput&pin=9&output=0`
      ),
    ]);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.turnOnColorAndValue(this.state.color, this.state.value);
  }
  async handleChange(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });

    if (e.target.name === 'colorVal') {
      let rgbColor = this.rgbColorVal(e.target.value);
      this.turnOffAll();
      await axios.all([
        axios.post(
          `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setPwmOutput&pin=5&output=${rgbColor.r}`
        ),
        axios.post(
          `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setPwmOutput&pin=6&output=${rgbColor.b}`
        ),
        axios.post(
          `http://us01.proxy.teleduino.org/api/1.0/328.php?k=${APIKey}&r=setPwmOutput&pin=9&output=${rgbColor.g}`
        ),
      ]);
      console.log('red', rgbColor.r, 'blue', rgbColor.b, 'green', rgbColor.g);
    }
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
          <label>Color</label>
          <input
            name="colorVal"
            type="color"
            value={this.state.colorVal}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default App;
