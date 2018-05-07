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
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
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
    })
  }

  render() {
    return (
      <div className="DrumData">
        <div className="measures-layout">
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
            note0={this.state.measures[2][0]}
            note1={this.state.measures[2][1]}
            note2={this.state.measures[2][2]}
            note3={this.state.measures[2][3]}
          />
          <Measures
            note0={this.state.measures[3][0]}
            note1={this.state.measures[3][1]}
            note2={this.state.measures[3][2]}
            note3={this.state.measures[3][3]}
          />
          <Measures
            note0={this.state.measures[4][0]}
            note1={this.state.measures[4][1]}
            note2={this.state.measures[4][2]}
            note3={this.state.measures[4][3]}
          />
          <Measures
            note0={this.state.measures[5][0]}
            note1={this.state.measures[5][1]}
            note2={this.state.measures[5][2]}
            note3={this.state.measures[5][3]}
          />
          <Measures
            note0={this.state.measures[6][0]}
            note1={this.state.measures[6][1]}
            note2={this.state.measures[6][2]}
            note3={this.state.measures[6][3]}
          />
          <Measures
            note0={this.state.measures[7][0]}
            note1={this.state.measures[7][1]}
            note2={this.state.measures[7][2]}
            note3={this.state.measures[7][3]}
          />
          <Measures
            note0={this.state.measures[8][0]}
            note1={this.state.measures[8][1]}
            note2={this.state.measures[8][2]}
            note3={this.state.measures[8][3]}
          />
        </div>
      </div>
    )
  }
}
export default socketConnect(DrumData)
