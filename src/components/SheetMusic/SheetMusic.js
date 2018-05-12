import React, { Component } from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import { getSheetMusic } from "../../ducks/reducer"

class SheetMusic extends Component {
  componentDidMount() {
    this.props.getSheetMusic(this.props.match.params.id)
  }

  render() {
    let sheetMusic = this.props.uri[0] || {} // checks to see if 1rst thing is truthy.
    console.log(sheetMusic)

    return (
      <div>
        {this.props.match.params.id}
        <div>
          <img src={sheetMusic.sheetmusic} alt="" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getSheetMusic })(SheetMusic)
