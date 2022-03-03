import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SocketProvider } from "socket.io-react"
import io from "socket.io-client"
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './ducks/store'

const socket = io.connect("http://localhost:3005")
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
)
// registerServiceWorker();
