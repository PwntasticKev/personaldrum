import React from "react"
import Header1 from "../Header1/Header1"
import { connect } from "react-redux"
import { setTempo } from "../../ducks/reducer"
import "./Arduino.css"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Typography from "material-ui/Typography"
import Button from "material-ui/Button"
import DrumData from "../DrumData/DrumData"
import SaveTab from "../CreateTab/saveTab"
import Sortable from "sortablejs"

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  color: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    color: "#FF3B3F"
  },
  appBarContainer: {
    boxShadow: "none"
  },
  saveTabButton: {
    border: "2px solid ghostwhite",
    textTransform: "none",
    letterSpacing: ".5px",
    backgroundColor: "#FF3B3F",
    color: "ghostwhite",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#FF3B3F",
      color: "ghostwhite",
      transform: "translate(0px, -5px)"
    }
  }
})

class Arduino extends React.Component {
  state = {
    value: 0,
    checkedA: true,
    checkedB: true,
    checkedF: true
  }
  snareput = snare => {
    if (snare) {
      let options = {
        group: {
          name: "snare"
        }
      }
      Sortable.create(snare, options)
    }
  }

  pull = snare => {
    if (snare) {
      let options = {
        draggable: "li", // Specifies which items inside the element should be sortable
        group: {
          name: "snare", //the name of the group
          pull: "clone", //when you drag it will remain in list grabbed from and put to place dragged.
          revertClone: true
        }
      }
      Sortable.create(snare, options)
    }
  }

  hihatput = hihat => {
    if (hihat) {
      let options = {
        group: {
          name: "hihat"
        }
      }
      Sortable.create(hihat, options)
    }
  }

  pullhihat = hihat => {
    // check if backing instance not null
    if (hihat) {
      let options = {
        draggable: "li", // Specifies which items inside the element should be sortable
        group: {
          name: "hihat",
          pull: "clone",
          revertClone: true
        }
      }
      Sortable.create(hihat, options)
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Header1 />
        <h2 className="instructions-header">Instructions</h2>
        <div className="instructions">
          <div>1. Make sure Drum is correctly connected</div>
          <div>2. Begin Playing your Groove!</div>
          <div>3. Stop playing and save your Schwifty Groove!</div>
        </div>
        {/* <div className="play-container">
            <div>
              <TextField
                id="number"
                label="Set Tempo..."
                onChange={e => this.props.setTempo(e.target.value)}
              />
              <Button onClick={this.play}>PLAY BUTTON</Button>
            </div>
          </div> */}
        {/* <div>play your shwifty groove!</div> */}

        <div id="sheetMusic">
          <div className="snare">
            <DrumData />
            {/* <div className="bar">
              <img src={musiclines} alt="" />
              <div className="e" />
              <div className="g" />
              <div className="b" />
              <div className="d" />
              <div className="f" />
            </div> */}
          </div>
        </div>

        <div className="bottom-container">
          <Button className={classes.saveTabButton}>Share</Button>
          <SaveTab />
        </div>
      </div>
    )
  }
}

Arduino.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    tempo: state.tempo
  }
}

export default connect(mapStateToProps, { setTempo })(
  withStyles(styles)(Arduino)
)
