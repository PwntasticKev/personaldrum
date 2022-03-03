import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserInfo, getTabs, searchVal } from "../../ducks/reducer"
import "./Header1.css"
import { Redirect } from "react-router-dom"
import TextField from "material-ui/TextField"
import WhiteSchwiftyLogo from "../notesimg/whiteschwifty.svg"
// import axios from 'axios'

class Header1 extends Component {
  constructor() {
    super()
    this.state = {
      isSearching: false
    }
  }
  componentDidMount() {
    this.props.getUserInfo()
  }

  search(e) {
    //will take a filter through the database of specific songs.
    if (e.keyCode === 13) {
      this.props.getTabs(e.target.value)
      this.setState({
        isSearching: true
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.isSearching ? <Redirect to="/home" /> : null}

        {/* {this.props.user ?  */}
        <div className="info-container">
          <div>{/* <SwipeableTemporaryDrawer /> */}</div>
          <div>
            <a href="/#/home">
              <img src={WhiteSchwiftyLogo} alt="" className="schwiftylogoimg" />
            </a>
          </div>
          <div className="profile">
            <TextField
              placeholder="Search Tabs..."
              onKeyDown={e => this.search(e)}
              onChange={e => this.props.searchVal(e.target.value)}
            >
              <input
                type="text"
                placeholder="Search..."
                onKeyDown={e => this.search(e)}
                onChange={e => this.props.searchVal(e.target.value)}
              />
            </TextField>
            <img
              alt=""
              className="avatar"
              src={this.props.user && this.props.user.img}
            />
          </div>
        </div>
        {/* : 
          <div className="info-container">
            <h1>SIGN IN DOE</h1>
            <Link to="/home">
              <button>Log in</button>
            </Link>
          </div>} */}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    searchVal: state.val
  }
}

export default connect(mapStateToProps, { getUserInfo, getTabs, searchVal })(
  Header1
)