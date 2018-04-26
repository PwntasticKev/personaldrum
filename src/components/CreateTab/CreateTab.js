import React from "react"
import Header1 from '../LoggedInHomepage/Header1/Header1'
import './CreateTab.css'
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import AppBar from "material-ui/AppBar"
import Tabs, { Tab } from "material-ui/Tabs"
import Typography from "material-ui/Typography"
import eightnote from './notesimg/8note.png'
import sixteenth from './notesimg/16th.png'

import Sortable from 'sortablejs'

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
  }
})

class ScrollableTabsButtonAuto extends React.Component {
  snareput = (snare) => {
    if (snare) {
      let options = {
        group: {
          name: 'snare',
        }
      };
      Sortable.create(snare, options);
    }
  }
  

  pull = snare => {
    // check if backing instance not null
    if (snare) {
      let options = {
        draggable: "li", // Specifies which items inside the element should be sortable
        group: {
          name: "snare",
          pull: "clone",
          revertClone: true,
  }
      }
      Sortable.create(snare, options)
    }
  }

  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }
  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <Header1 />
        <div>
         

          {/* <div className="container" ref={this.sortableContainersDecorator}> */}
            {/* <div className="group">
              <h2 className="group-title">Group 1</h2>
              <div className="group-list" ref={this.snareput}>
              <li></li>
              </div>
            </div> */}
            {/* <div className="group">
              <h2 className="group-title">Group 2</h2>
              <div className="group-list" ref={this.pull}>
                <li className="group-title">o</li>
                <li className="group-title">o o</li>
                <li className="group-title">o o o</li>
                <li className="group-title">o o o o</li>
              </div>
            </div> */}
          {/* </div> */}
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Snare" />
            <Tab label="Hi-Hat" />
            <Tab label="Base Drum" />
            <Tab label="Crash Cymbal" />
            <Tab label="China" />
            <Tab label="Splash" />
            <Tab label="" />
          </Tabs>
        </AppBar>
        {value === 0 && (<TabContainer><div className="group">
              <div className="group-list" ref={this.pull}>
                <li className="notes">o</li>
                <li className="notes"><img src={ eightnote } alt="missing"/></li>
                <li className="notes">o o o</li>
                <li className="notes"><img src={ sixteenth } alt=""/></li>
              </div>
            </div></TabContainer>)}
        {value === 1 && (<TabContainer></TabContainer>)}
        {value === 2 && (<TabContainer></TabContainer>)}
        {value === 3 && (<TabContainer></TabContainer>)}
        {value === 4 && (<TabContainer></TabContainer>)}
        {value === 5 && (<TabContainer></TabContainer>)}
        {value === 6 && (<TabContainer></TabContainer>)}
        
            <div>place your shwifty groove!</div>
              <div class='music'>
                <div class='E'></div>
                <div class='f'></div>
                <div class='g'></div>
                <div class='a'></div>
                <div class='b'></div>
                <div className="c" ref={this.snareput}><li></li></div>
                <div class='d'></div>
                <div class='e'></div>
                <div class='f'></div>
              </div>
      </div>
    )
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScrollableTabsButtonAuto)