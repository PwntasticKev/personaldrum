import React, { Component } from "react"
import axios from "axios"
import { socketConnect } from "socket.io-react"

class DrumData extends Component {
  constructor(props) {
    super()
    this.state = {
      hit: ["1"]
    }
  }

  componentDidMount() {
    this.getDrum()
  }

  getDrum() {
    console.log("got it")
    axios
      .get("/api/drum")
      .then(res => {
        this.setState({
          hit: res.data
        })
      })
      .catch(console.log())
  }

  render() {
    let socket = this.props
    return (
      <div className="DrumData">
        <div>{this.state.hit}</div>
        <button onClick={e => this.blink()}>BLINK</button>
      </div>
    )
  }
}

export default DrumData
