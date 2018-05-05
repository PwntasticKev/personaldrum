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
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
      </div>
    )
  }
}
export default socketConnect(DrumData)
