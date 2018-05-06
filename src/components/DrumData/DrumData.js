import React, { Component } from "react"
import { socketConnect } from "socket.io-react"
import "./DrumData.css"
// import io from 'socket.io-react'

class DrumData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hit: [],
      measure: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  componentDidMount() {
    this.getDrum()
    console.log("iwork")
  }
  //64 divs with a map
  //if hit change 0 div to 1
  //

  getDrum() {
    let { socket } = this.props
    socket.on("hit", recentHits => {
      this.setState({ hit: recentHits })
      //if 1 then 1/4 note
      //if 2 then half note
    })
  }

  render() {
    return (
      <div className="DrumData">
        <div>{this.state.hit}</div>
        <button onClick={this.resetHits}>reset hits</button>
        <button onClick={this.listening}>reset hits</button>
        <div className="measure">
          <div>{this.state.measure[0]}</div>
          <div>{this.state.measure[1]}</div>
          <div>{this.state.measure[2]}</div>
          <div>{this.state.measure[3]}</div>
          <div>{this.state.measure[4]}</div>
          <div>{this.state.measure[5]}</div>
          <div>{this.state.measure[6]}</div>
          <div>{this.state.measure[7]}</div>
          <div>{this.state.measure[8]}</div>
          <div>{this.state.measure[9]}</div>
          <div>{this.state.measure[10]}</div>
          <div>{this.state.measure[11]}</div>
          <div>{this.state.measure[12]}</div>
          <div>{this.state.measure[13]}</div>
          <div>{this.state.measure[14]}</div>
          <div>{this.state.measure[15]}</div>
          <div>{this.state.measure[16]}</div>
        </div>
      </div>
    )
  }
}
export default socketConnect(DrumData)
