import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import SwipeableDrawer from "material-ui/SwipeableDrawer"
import Button from "material-ui/Button"
import List from "material-ui/List"
// import Divider from "material-ui/Divider"
import "typeface-roboto"
import { Link } from "react-router-dom"
import './Menucss.css'
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData"

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }, stuff: {
    padding: "1rem 1rem"
  }
}

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    left: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  render() {
    const { classes } = this.props

    const fullList = <div className={classes.fullList}>
        <List>
          <Link to="/loggedin">
            <Button className={classes.stuff}>Home</Button>
          </Link>
          <Link to="/arduino">
            <Button className={classes.stuff}>Profile</Button>
          </Link>
          <Link to="/search">
            <Button className={classes.stuff}>Shwifty Search</Button>
          </Link>
          <Link to="/createtab">
            <Button className={classes.stuff}>CreateTab</Button>
          </Link>
        </List>
        {/* <Divider /> */}
        {/* <List>{}</List> */}
      </div>

    return (
      <div>
        <Button onClick={this.toggleDrawer("left", true)}>Menu</Button>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)} >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)} >
            {fullList}
          </div>
        </SwipeableDrawer> 
       
      </div>
    )
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SwipeableTemporaryDrawer)
