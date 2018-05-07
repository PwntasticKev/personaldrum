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
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
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
      let tempArr = [...measureObj.renderArr]
      let buildArr = []
      let finishArr = []
      for (let i = 0; i <= 3; i++) {
        for (let i = 0; i <= 3; i++) {
          buildArr.push(tempArr[i])
        }
        tempArr.splice(0, 4)
        finishArr.push(buildArr)
        buildArr = []
      }

      console.log("render arr:", measureObj)
      let measureArray = [...this.state.measures]
      measureArray[measureObj.measure] = finishArr
      finishArr = []
      console.log(measureArray)
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
        <Measures
          note0={this.state.measures[0][0]}
          note1={this.state.measures[0][1]}
          note2={this.state.measures[0][2]}
          note3={this.state.measures[0][3]}
        />
        <Measures
          note0={this.state.measures[1][0]}
          note1={this.state.measures[1][1]}
          note2={this.state.measures[1][2]}
          note3={this.state.measures[1][3]}
        />
        <Measures
          note0={this.state.measures[1][0]}
          note1={this.state.measures[1][1]}
          note2={this.state.measures[1][2]}
          note3={this.state.measures[1][3]}
        />
        <Measures
          note0={this.state.measures[1][0]}
          note1={this.state.measures[1][1]}
          note2={this.state.measures[1][2]}
          note3={this.state.measures[1][3]}
        />
        <Measures
          note0={this.state.measures[1][0]}
          note1={this.state.measures[1][1]}
          note2={this.state.measures[1][2]}
          note3={this.state.measures[1][3]}
        />
        <Measures
          note0={this.state.measures[1][0]}
          note1={this.state.measures[1][1]}
          note2={this.state.measures[1][2]}
          note3={this.state.measures[1][3]}
        />
        <Measures
          note0={this.state.measures[1][0]}
          note1={this.state.measures[1][1]}
          note2={this.state.measures[1][2]}
          note3={this.state.measures[1][3]}
        />
        <Measures
          note0={this.state.measures[1][0]}
          note1={this.state.measures[1][1]}
          note2={this.state.measures[1][2]}
          note3={this.state.measures[1][3]}
        />
        <Measures
          note0={this.state.measures[1][0]}
          note1={this.state.measures[1][1]}
          note2={this.state.measures[1][2]}
          note3={this.state.measures[1][3]}
        />
        {/* <Measures measure={this.state.measures[2]} />
        <Measures measure={this.state.measures[3]} />
        <Measures measure={this.state.measures[4]} />
        <Measures measure={this.state.measures[5]} />
        <Measures measure={this.state.measures[6]} />
        <Measures measure={this.state.measures[7]} /> */}
      </div>
    )
  }
}
export default socketConnect(DrumData)
