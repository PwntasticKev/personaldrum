import React, { Component } from "react"
import Header1 from "../LoggedInHomepage/Header1/Header1"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getTabs } from "../../ducks/reducer"
import "./ShwiftySearch.css"
import ShwiftyButton from "./ShwiftyButton"
import TextField from "material-ui/TextField"

class ShwiftySearch extends Component {
  componentDidMount() {
    this.props.getTabs("")
  }

  render() {
    const tabinfo = this.props.totalTabs.map(obj => {
      return (
        <div className="card">
          <div key={obj.id} className="inner-card">
            <div className="songname">
              <Link to={`/sheetmusic/${obj.id}`}>{obj.songname}</Link>
            </div>
            <div>
              <div className="artist">{obj.artist}</div>
            </div>
            <div className="img-album-container">
              <div>
                <div>{obj.album}</div>
              </div>
              <div className="albumimg">
                {<img src={obj.songimg} alt="`img no work`" />}
              </div>
            </div>
          </div>
          {/* <div>FAVORITE SHARE DOWNLOAD</div> */}
        </div>
      )
    })
    return (
      <div className="main-container-search">
        <div className="header-container">
          <Header1 />
        </div>
        <div className="search-container">
          <div className="searchBox">
            <TextField
              id="with-placeholder"
              label="Schwifty Grooves"
              margin="normal"
              onChange={
                e =>
                  e.target.value
                    ? this.props.getTabs(e.target.value)
                    : this.props.getTabs()
                // this.props.getTabs(e.target.value === 0)
              }
            />
          </div>
          <ShwiftyButton />
        </div>
        <div className="description">
          <div className="song">Song</div>
          <div>Artist</div>
          <div className="album-cover-description">
            <div className="album-description">Album</div>
            <div>Album Cover</div>
          </div>
        </div>
        <div>{this.props.getTabs}</div>
        <div className="card-container">{tabinfo}</div>
        {/* <div>{this.props.getTabs()}</div> */}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getTabs })(ShwiftySearch)
