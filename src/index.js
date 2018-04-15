import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SocketProvider } from "socket.io-react"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3005")
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SocketProvider socket={socket}><App /></SocketProvider>, document.getElementById('root'));
// registerServiceWorker();
