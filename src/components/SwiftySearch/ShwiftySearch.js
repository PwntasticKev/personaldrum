import React, { Component } from "react"
import Header1 from "../LoggedInHomepage/Header1/Header1"
import { connect } from "react-redux"
import { getTabs } from "../../ducks/reducer"
import "./ShwiftySearch.css"
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
            <div className="songname">{obj.songname}</div>
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
        <Header1 />
        <div>Search For Grooves</div>
        <div>
          <TextField
            className="searchbox"
            id="with-placeholder"
            label="Schwifty Groove"
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
        <div className="description">
          <div className="song">Song</div>
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
