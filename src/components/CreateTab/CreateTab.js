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
import hihat2 from './notesimg/2hihat.svg'
import hihat3 from './notesimg/3hihat.svg'
import hihat4 from './notesimg/4hihat.svg'
import crash from './notesimg/crash.svg'
import note from './notesimg/note.svg'
import base1 from './notesimg/base1.svg'
import base2 from './notesimg/base2.svg'
import base3 from './notesimg/base3.svg'
import base4 from './notesimg/base4.svg'
import znote from './notesimg/znote.svg'
import crashnote from './notesimg/crashnote.svg'
import snareroll from './notesimg/snareroll.svg'
import choke from './notesimg/choke.svg'
import snarefast3 from './notesimg/quicktriple.svg'
import snarefast4 from './notesimg/quickquad.svg'
import SaveTab from './saveTab'
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
  },
  color: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    color: '#FF3B3F'
  },
  appBarContainer: {
    boxShadow: 'none'
  }
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

class ScrollableTabsButtonAuto extends React.Component {
      state = {
        value: 0,
        checkedA: true,
        checkedB: true,
        checkedF: true,
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

  hihatput = (hihat) => {
    if (hihat) {
      let options = {
        group: {
          name: 'hihat',
        }
      };
      Sortable.create(hihat, options);
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
          revertClone: true,
  }
      }
      Sortable.create(hihat, options)
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
        <AppBar position="center" color="default" className={classes.appBarContainer}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            // indicatorColor="primary" 
            className = {classes.color}
            // scrollable
            // scrollButtons="auto"
          >
            <Tab label="Snare" />
            <Tab label="Hi-Hat" />
            <Tab label="Base Drum" />
            <Tab label="Toms" />
            <Tab label="Cymbals" />
          </Tabs>
        </AppBar>
        {value === 0 && (<TabContainer><div className="group">
              <div className="group-list" ref={this.pull}>
                <li className="notes" id='snare1'><img src={ snare1 } alt="missing"/></li>
                <li className="notes" id='snare2'><img src={ snare2 } alt="missing"/></li>
                <li className="notes" id='snare3'><img src={ snare3 } alt="missing"/></li>
                <li className="notes" id='snare4'><img src={ snare4 } alt=""/></li>
             
              <div className="extrasnare" ref={this.pull}>
              {/* <div className="snareextras"> */}
                  <li className="notes" id='snare1'><img src={ snareroll } alt="missing"/></li>
                  <li className="notes" id='snare4'><img src={ snarefast3 } alt="missing"/></li>
                  <li className="notes" id='snare3'><img src={ snarefast3 } alt="missing"/></li>
                  <li className="notes" id='snare5'><img src={ snarefast4 } alt="missing"/></li>
              {/* </div> */}
              </div>
              </div>
            </div></TabContainer>)}
        {value === 1 && (
          <TabContainer>
          <div className="group-list" ref={this.pullhihat}>
             <li className="notes" id='snare1'><img src={ snare1 } alt="notthere"/></li>
             <li className="notes" id='hihat2'><img src={ hihat2 } alt="missing"/></li>
             <li className="notes" id='snare3'><img src={ hihat3 } alt="missing"/></li>
             <li className="notes" id='snare4'><img src={ hihat4 } alt=""/></li>
             </div>
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
                <li className="notes" id='snare1'><img src={ snare1 } alt="missing"/></li>
                <li className="notes" id='snare2'><img src={ snare2 } alt="missing"/></li>
                <li className="notes" id='snare3'><img src={ snare3 } alt="missing"/></li>
                <li className="notes" id='snare4'><img src={ snare4 } alt=""/></li>
           </TabContainer>)}
        {value === 4 && (
          <TabContainer>
             <li className="notes" id='snare1'><img src={ note } alt="missing"/></li>
             <li className="notes" id='snare1'><img src={ crash } alt="missing"/></li>
             <li className="notes"><img src={ snare3 } alt="missing"/></li>
             <li className="notes"><img src={ snare4 } alt=""/></li>
          </TabContainer>)}
       
        
            <div>place your shwifty groove!</div>
            <div id='sheetMusic'>
              <div className='music'>
              <div className='china' ref={this.crashput}><li></li></div>
              <div className='splash' ref={this.crashput}><li></li></div>
              <div className='crash2' ref={this.crashput}><li></li></div>
              <div className='crash' ref={this.crashput}><li></li></div>
                <div className='hihat' ref={this.hihatput}><li></li></div>
                <div>
                <div className="snare" ref={this.snareput}><li></li></div>
                </div>
              <div className="bar">
                <div className='e'></div>
                <div className='g'></div>
                <div className='b'></div>
                <div className='d'></div>
                <div className='f'></div>
              </div>
              </div>
              </div>

              <div>
                <div className='bottom-container'>
                  <Button>Share</Button>
                  <SaveTab/>
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