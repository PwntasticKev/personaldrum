import React, { Component } from "react"
// import { Link } from 'react-router-dom'
import "./Homepage.css"
import whiteschwifty from "../notesimg/whiteschwifty.svg"
import pinkschwifty from "../notesimg/pinkschwifty.svg"
import Button from "material-ui/Button"
import TransitionGroup from "react-transition-group/TransitionGroup"
import { TweenMax, Elastic } from "gsap"

// TweenMax.to(target, duration, {vars})

export default class Homepage extends Component {
  componentDidMount() {
    // this.test()
  }

  test() {
    console.log("working booton")
    TweenMax.to(".fun-dots", 20, {
      position: "relative",
      top: "0"
    })
  }

  render() {
    const { REACT_APP_LOGIN } = process.env

    return (
      <div>
        <div className="main-page">
          <div className="login">
            <div className="welcome">WELCOME TO...</div>
            <img className="pinkschwifty" src={pinkschwifty} alt="" />
            <div className="login-container">
              <a href={REACT_APP_LOGIN}>
                <button className="home-login-button">Login</button>
              </a>
            </div>
          </div>
          <div className="fun-dots">
            <div className="dot1">.</div>
            <div className="dot1">.</div>
          </div>
        </div>
      </div>
    )
  }
}
