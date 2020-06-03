import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.turnOnHandler = this.turnOnHandler.bind(this);
    this.turnOffHandler = this.turnOffHandler.bind(this);
  }
  async turnOnHandler() {
    console.log('this is turn on');
    let res = await axios.GET(
      'https://us01.proxy.teleduino.org/api/1.0/328.php?k={BF9599700F9E8D3D63C858A32A96D9EB}&r=getVersion'
    );
    console.log(res);
  }
  async turnOffHandler() {
    console.log('this is turn off');
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.turnOnHandler}>Turn On</button>
        <button onClick={this.turnOffHandler}>Turn Off</button>
      </div>
    );
  }
}

export default App;
