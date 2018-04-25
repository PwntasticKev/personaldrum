import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Homepage.css'

export default class Homepage extends Component {

  render() {
    const {
      REACT_APP_LOGIN
    } = process.env
    
    
    return <div>
          <div className="recreate">Inspirational Shi</div>
        <div className="main-page">
          <div className="login">
            <div>SHWIFTY LOGO</div>
            <div>
              <a href={REACT_APP_LOGIN}>
                <button>Login</button>
              </a>
            </div>
          </div>
        </div>
      </div>
  }
}
