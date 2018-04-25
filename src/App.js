import React, { Component } from 'react';
import './App.css';
// import axios from 'axios'
// import { socketConnect } from "socket.io-react"
import routes from './routes'

class App extends Component {

  render() {
    
    return (
      <div className="App">
      { routes }
      </div>
    );
  }
}

export default App;
