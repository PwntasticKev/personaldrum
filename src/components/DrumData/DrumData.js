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

      // console.log("render arr:", measureObj)
      let measureArray = [...this.state.measures]
      measureArray[measureObj.measure] = finishArr
      finishArr = []
      // console.log(measureArray)
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
          <Measures
            note0={this.state.measures[9][0]}
            note1={this.state.measures[9][1]}
            note2={this.state.measures[9][2]}
            note3={this.state.measures[9][3]}
          />
          <Measures
            note0={this.state.measures[10][0]}
            note1={this.state.measures[10][1]}
            note2={this.state.measures[10][2]}
            note3={this.state.measures[10][3]}
          />
          <Measures
            note0={this.state.measures[11][0]}
            note1={this.state.measures[11][1]}
            note2={this.state.measures[11][2]}
            note3={this.state.measures[11][3]}
          />
          <Measures
            note0={this.state.measures[12][0]}
            note1={this.state.measures[12][1]}
            note2={this.state.measures[12][2]}
            note3={this.state.measures[12][3]}
          />
          <Measures
            note0={this.state.measures[13][0]}
            note1={this.state.measures[13][1]}
            note2={this.state.measures[13][2]}
            note3={this.state.measures[13][3]}
          />
          <Measures
            note0={this.state.measures[14][0]}
            note1={this.state.measures[14][1]}
            note2={this.state.measures[14][2]}
            note3={this.state.measures[14][3]}
          />
          <Measures
            note0={this.state.measures[15][0]}
            note1={this.state.measures[15][1]}
            note2={this.state.measures[15][2]}
            note3={this.state.measures[15][3]}
          />
          <Measures
            note0={this.state.measures[16][0]}
            note1={this.state.measures[16][1]}
            note2={this.state.measures[16][2]}
            note3={this.state.measures[16][3]}
          />
          <Measures
            note0={this.state.measures[17][0]}
            note1={this.state.measures[17][1]}
            note2={this.state.measures[17][2]}
            note3={this.state.measures[17][3]}
          />
          <Measures
            note0={this.state.measures[18][0]}
            note1={this.state.measures[18][1]}
            note2={this.state.measures[18][2]}
            note3={this.state.measures[18][3]}
          />
          <Measures
            note0={this.state.measures[19][0]}
            note1={this.state.measures[19][1]}
            note2={this.state.measures[19][2]}
            note3={this.state.measures[19][3]}
          />
          <Measures
            note0={this.state.measures[20][0]}
            note1={this.state.measures[20][1]}
            note2={this.state.measures[20][2]}
            note3={this.state.measures[20][3]}
          />
          <Measures
            note0={this.state.measures[21][0]}
            note1={this.state.measures[21][1]}
            note2={this.state.measures[21][2]}
            note3={this.state.measures[21][3]}
          />
          <Measures
            note0={this.state.measures[22][0]}
            note1={this.state.measures[22][1]}
            note2={this.state.measures[22][2]}
            note3={this.state.measures[22][3]}
          />
          <Measures
            note0={this.state.measures[23][0]}
            note1={this.state.measures[23][1]}
            note2={this.state.measures[23][2]}
            note3={this.state.measures[23][3]}
          />
          <Measures
            note0={this.state.measures[24][0]}
            note1={this.state.measures[24][1]}
            note2={this.state.measures[24][2]}
            note3={this.state.measures[24][3]}
          />
          <Measures
            note0={this.state.measures[25][0]}
            note1={this.state.measures[25][1]}
            note2={this.state.measures[25][2]}
            note3={this.state.measures[25][3]}
          />
          <Measures
            note0={this.state.measures[26][0]}
            note1={this.state.measures[26][1]}
            note2={this.state.measures[26][2]}
            note3={this.state.measures[26][3]}
          />
          <Measures
            note0={this.state.measures[27][0]}
            note1={this.state.measures[27][1]}
            note2={this.state.measures[27][2]}
            note3={this.state.measures[27][3]}
          />
          <Measures
            note0={this.state.measures[28][0]}
            note1={this.state.measures[28][1]}
            note2={this.state.measures[28][2]}
            note3={this.state.measures[28][3]}
          />
          <Measures
            note0={this.state.measures[29][0]}
            note1={this.state.measures[29][1]}
            note2={this.state.measures[29][2]}
            note3={this.state.measures[29][3]}
          />
        </div>
      </div>
    )
  }
}
export default socketConnect(DrumData)
