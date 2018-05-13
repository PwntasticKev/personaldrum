import React, { Component } from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import { getSheetMusic, getSong } from "../../ducks/reducer"
import Header1 from "../LoggedInHomepage/Header1/Header1"

class SheetMusic extends Component {
  componentDidMount() {
    this.props.getSheetMusic(this.props.match.params.id)
    this.props.getSong()
  }

  render() {
    const { songName } = this.props
    let sheetMusic = this.props.uri[0] || {} // checks to see if 1rst thing is truthy.
    console.log(this.props)

    let song = this.props.songName
    console.log("song:", song)
    return (
      <div>
        <Header1 />
        {this.props.match.params.id}
        {songName}
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

export default connect(mapStateToProps, { getSheetMusic, getSong })(SheetMusic)
