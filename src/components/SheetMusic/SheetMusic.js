import React, { Component } from "react"
import { render } from "react-dom"

class SheetMusic extends Component {
  render() {
    console.log(this.props.id)

    return (
      <div>
        {this.props.match.params.id}
        <div>{this.props.id}</div>
      </div>
    )
  }
}

export default SheetMusic
