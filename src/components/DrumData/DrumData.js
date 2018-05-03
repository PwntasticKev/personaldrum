import React, { Component } from "react"
import { socketConnect } from "socket.io-react"
// import io from 'socket.io-react'

class DrumData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hit: [],
    }
  }

  componentDidMount() {
    this.getDrum()
    console.log('iwork');
    
  }

  getDrum() {
    let { socket } = this.props
    socket.on("hit", hits => {
      if (hits)
      this.setState({ hit: hits })
    })
  }



  render() {
    return (
      <div className="DrumData">
        <div>{this.state.hit}</div>
      </div>
    )
  }
}
export default socketConnect(DrumData)
