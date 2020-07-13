import React, { Component } from "react"
import Header1 from "../Header1/Header1"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getTabs, deleteTab } from "../../ducks/reducer"
import ShwiftyButton from "./ShwiftyButton"
import TextField from "material-ui/TextField"
import Button from "material-ui/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import Tooltip from "material-ui/Tooltip"
import IconButton from "material-ui/IconButton"
import { withStyles } from "material-ui/styles"
import "./ShwiftySearch.css"
import EditButton from "./EditButton"
import { TweenMax } from "gsap"

const styles = theme => ({
  editButton: {
    margin: theme.spacing.unit * 1,
    background: "#ff3b3f",
    height: "40px",
    width: "40px",
    color: "white",
    "&:hover": {
      opacity: ".7",
      background: "#ff3b3f"
    }
  },
  deleteButton: {
    color: "black"
  }
})

// function moveAnimation({ target }) {
//   //just ES6 syntax sugar
//   var footer = target.find({ type: "footer" })
//   var buttons = footer.findAll({ type: "button" })
// }

// TweenMax.to()

class ShwiftySearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editSongs: false,
      editButton: false
    }
  }
  componentDidMount() {
    this.props.getTabs("")
    // this.mutateEdit()
  }

  mutateEdit() {
    TweenMax.to(".dot-container", 2, { transform: "rotate(360deg)" })
  }

  editButtonOpen = () => {
    if (this.state.editSongs === false) {
      this.setState({
        editSongs: true
      })
    } else if (this.state.editSongs === true) {
      this.setState({
        editSongs: false
      })
    }
    this.mutateEdit()
  }
  editButtonClose = () => {
    this.setState({ editSongs: false })
  }

  editButton = () => {
    this.setState({
      editButton: true
    })
    console.log("the update button")
  }

  render() {
    const { classes } = this.props

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
            </div>
            <div className="albumimg">
              {<img src={obj.songimg} alt="`img no work`" />}
              <div
                className="edit"
                style={{ display: this.state.editSongs ? "block" : "none" }}
              >
                <div className="updatedivs">
                  <Tooltip id="tooltip-icon" title="Delete">
                    <IconButton aria-label="Delete">
                      <DeleteIcon
                        className={classes.deleteButton}
                        onClick={_ => this.props.deleteTab(obj.id)}
                      />
                    </IconButton>
                  </Tooltip>
                  <div className="search-edit-container">
                    <EditButton id={obj.id} />
                  </div>
                </div>
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
          <div className="button-container">
            <ShwiftyButton />
            <div>
              <Tooltip id="tooltip-fab" title="Edit Songs">
                <Button
                  id="create-tab-button"
                  variant="fab"
                  className={classes.editButton}
                  onClick={_ => this.editButtonOpen()}
                >
                  <div className="dot-container">
                    <div className="dot">.</div>
                    <div className="dot">.</div>
                    <div className="dot">.</div>
                  </div>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="description">
          <div className="song">Song</div>
          <div>Artist</div>
          <div className="album-cover-description">
            <div className="album-description">Album</div>
          </div>
          <div>Album Cover</div>
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

export default connect(mapStateToProps, { getTabs, deleteTab })(
  withStyles(styles)(ShwiftySearch)
)
