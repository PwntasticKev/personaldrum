import React, { Component } from "react"
// import { Link } from 'react-router-dom'
import "./Homepage.css"
import whiteschwifty from "../notesimg/whiteschwifty.svg"
import Button from "material-ui/Button"

export default class Homepage extends Component {
  render() {
    const { REACT_APP_LOGIN } = process.env

    return (
      <div>
        <div className="main-page">
          <div className="login">
            <img src={whiteschwifty} alt="" />
            <div className="login-container">
              <a href={REACT_APP_LOGIN}>
                <Button>Login</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
