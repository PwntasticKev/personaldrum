import React from "react"
import Header1 from '../LoggedInHomepage/Header1/Header1'
import { connect } from 'react-redux'
import { setTempo } from '../../ducks/reducer'
import './CreateTab.css'
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import AppBar from "material-ui/AppBar"
import Tabs, { Tab } from "material-ui/Tabs"
import Typography from "material-ui/Typography"
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import snare1 from './notesimg/juansnare.svg'
import snare2 from './notesimg/2snare.svg'
import snare3 from './notesimg/3snare.svg'
import snare4 from './notesimg/4snare.svg'

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
      state = {
        value: 0,
        checkedA: true,
        checkedB: true,
        checkedF: true,
        opened: false,
      }
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
// will activate the method to listen for when the drum is being hit. 
  play() {
    console.log('play button!');
    
  }


  handleChange = (event, value) => {
    this.setState({ value })
  }

 

  render() {
    const { classes } = this.props
    const { value } = this.state

    const showNote = {
      display: 'none'
    }

    
    return (
      <div className={classes.root}>
        <Header1 />
        <div className='instructions'>
        <div>
          instruction on how to begin. 
        </div>
        <div className='play-container'>
        <div>
        <TextField id='number' label="Set Tempo..." 
        onChange={e => this.props.setTempo(e.target.value)}>
        </TextField>
          <Button onClick={this.play}>PLAY BUTTON</Button>
        </div>
        </div>
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
            <Tab label="Toms" />
            <Tab label="Crash Cymbal" />
            <Tab label="China" />
            <Tab label="Splash" />
          </Tabs>
        </AppBar>
        {value === 0 && (<TabContainer><div className="group">
              <div className="group-list" ref={this.pull}>
                <li className="notes" id='snare1'><img src={ snare1 } alt="missing"/></li>
                <li className="notes"><img src={ snare2 } alt="missing"/></li>
                <li className="notes" id='snare3'><img src={ snare3 } alt="missing"/></li>
                <li className="notes" id='snare4'><img src={ snare4 } alt=""/></li>
              </div>
            </div></TabContainer>)}
        {value === 1 && (
          <TabContainer>
             <li className="notes"><img src={ snare1 } alt="missing"/></li>
             <li className="notes"><img src={ snare2 } alt="missing"/></li>
             <li className="notes"><img src={ snare3 } alt="missing"/></li>
             <li className="notes"><img src={ snare4 } alt=""/></li>
           </TabContainer>)}
        {value === 2 && (
          <TabContainer>
            <li className="notes"><img src={ snare1 } alt="missing"/></li>
            <li className="notes"><img src={ snare2 } alt="missing"/></li>
            <li className="notes"><img src={ snare3 } alt="missing"/></li>
            <li className="notes"><img src={ snare4 } alt=""/></li>
          </TabContainer>)}
        {value === 3 && (
          <TabContainer>
             <li className="notes"><img src={ snare1 } alt="missing"/></li>
             <li className="notes"><img src={ snare2 } alt="missing"/></li>
             <li className="notes"><img src={ snare3 } alt="missing"/></li>
             <li className="notes"><img src={ snare4 } alt=""/></li>
           </TabContainer>)}
        {value === 4 && (
          <TabContainer>
             <li className="notes"><img src={ snare1 } alt="missing"/></li>
             <li className="notes"><img src={ snare2 } alt="missing"/></li>
             <li className="notes"><img src={ snare3 } alt="missing"/></li>
             <li className="notes"><img src={ snare4 } alt=""/></li>
          </TabContainer>)}
        {value === 5 && (
          <TabContainer>
             <li className="notes"><img src={ snare1 } alt="missing"/></li>
             <li className="notes"><img src={ snare2 } alt="missing"/></li>
             <li className="notes"><img src={ snare3 } alt="missing"/></li>
             <li className="notes"><img src={ snare4 } alt=""/></li>
          </TabContainer>)}
        {value === 6 && (
          <TabContainer>
             <li className="notes"><img src={ snare1 } alt="missing"/></li>
             <li className="notes"><img src={ snare2 } alt="missing"/></li>
             <li className="notes"><img src={ snare3 } alt="missing"/></li>
             <li className="notes"><img src={ snare4 } alt=""/></li>
          </TabContainer>)}
        
            <div>place your shwifty groove!</div>
              <div className='music'>
              <div> <div className='E'></div></div>
                <div className='f'></div>
                <div className='g'></div>
                <div>
      
                <div className="a" ref={this.snareput}><li></li><Checkbox onClick=''/></div>
                </div>
                <div className='b'></div>
                <div className='c'></div>
                <div className=''></div>
                <div className='e'></div>
                <div className='f'></div>
              </div>
              <div>
                <div className='bottom-container'>
                  <div><Button>Share</Button></div>
                  <div><Button>Download</Button></div>
                  <div><Button>save</Button></div>
                </div>
              </div>
      </div>
    )
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    tempo: state.tempo
  }
}


export default connect(mapStateToProps, { setTempo })(withStyles(styles)(ScrollableTabsButtonAuto));