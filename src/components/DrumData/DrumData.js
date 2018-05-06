import React, { Component } from "react"
import { socketConnect } from "socket.io-react"
import "./DrumData.css"
import Measures from "../Measures/Measures"
// import io from 'socket.io-react'

class DrumData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      measures: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
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
    socket.on("hit", measureObj => {
      console.log("render arr:", measureObj)
      let measureArray = this.state.measures
      measureArray[measureObj.measure] = measureObj.renderArr
      this.setState({
        measures: measureArray
      })
      //if 1 then 1/4 note
      //if 2 then half note
    })
  }

  render() {
    return (
      <div className="DrumData">
        {/* <div>{this.state.hit}</div> */}
        <button onClick={this.resetHits}>reset hits</button>
        <button onClick={this.listening}>reset hits</button>
        <Measures measure={this.state.measures[0]} />
        <Measures measure={this.state.measures[1]} />
        <Measures measure={this.state.measures[2]} />
        <Measures measure={this.state.measures[3]} />
        <Measures measure={this.state.measures[4]} />
        <Measures measure={this.state.measures[5]} />
        <Measures measure={this.state.measures[6]} />
        <Measures measure={this.state.measures[7]} />
      </div>
    )
  }
}
export default socketConnect(DrumData)
