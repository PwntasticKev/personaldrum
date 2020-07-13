import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import AddIcon from "@material-ui/icons/Add"
import Button from "material-ui/Button"
import Tooltip from "material-ui/Tooltip"
import "./ShwiftyButton.css"
import { Link } from "react-router-dom"

const styles = theme => ({
  createTabButton: {
    margin: theme.spacing.unit * 1,
    // margin: "1%",
    background: "#ff3b3f",
    height: "40px",
    width: "40px",
    color: "white",
    listStyleType: "none",
    "&:hover": {
      opacity: ".7",
      background: "#ff3b3f"
    }
  },
  addicon: {
    color: "white",
    display: "flex"
  }
})

class SimpleTooltips extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className="addicon">
        <Tooltip id="tooltip-fab" title="Create Your Own!">
          <Button
            id="create-tab-button"
            variant="fab"
            aria-label="Add"
            className={classes.createTabButton}
          >
            <Link to={`/create`}>
              <AddIcon className={classes.addicon} />
            </Link>
          </Button>
        </Tooltip>
      </div>
    )
  }
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTooltips)
