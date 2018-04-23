import React, { Component } from 'react';
import './App.css';
// import axios from 'axios'
// import { socketConnect } from "socket.io-react"
import DrumData from './components/DrumData'

class App extends Component {

  render() {
    
    return (
      <div className="App">
      <DrumData />
      </div>
    );
  }
}

export default App;
