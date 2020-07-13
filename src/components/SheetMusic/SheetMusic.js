import React, { Component } from "react"
// import { render } from "react-dom"
import { connect } from "react-redux"
import { getSheetMusic, getSong } from "../../ducks/reducer"
import Header1 from "../Header1/Header1"
import "./SheetMusic.css"

class SheetMusic extends Component {
  componentDidMount() {
    this.props.getSheetMusic(this.props.match.params.id)
    this.props.getSong(this.props.match.params.id)
  }

  render() {
    let { songname, songimg, artist, album } = this.props.totalTabs[0] || {}
    let sheetMusic = this.props.uri[0] || {} // checks to see if 1rst thing is truthy.
    console.log(this.props.totalTabs[0])
    console.log(this.props.uri)

    return (
      <div>
        <Header1 />
        <div className="song-info-container">
          <div>
            <div className="artist-img-container">
              <img src={songimg} alt="" />
              <div>Artist: {artist}</div>
              <div>Album: {album}</div>
            </div>
          </div>
          <div className="song-name">{songname}</div>
        </div>
        <div className="sheetmusicimg">
          <img src={sheetMusic.sheetmusic} alt="" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return state
}

export default connect(mapStateToProps, { getSheetMusic, getSong })(SheetMusic)
