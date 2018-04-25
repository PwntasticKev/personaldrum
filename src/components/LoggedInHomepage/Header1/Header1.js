import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getUserInfo } from "../../../ducks/reducer"
import "./Header1.css"
import MenuButton from './MenuButton'
// import axios from 'axios'

class Header1 extends Component {
  componentDidMount() {
    this.props.getUserInfo()
    // axios.get('auth/me').then(res => { // this gets the obj off the auth 0
    //   console.log('this juan', res.data)
    // })
  }


  search(e) { //will take a filter through the database of specific songs. 
    if (e.keyCode == 13) {
      console.log("hitting enter.")
    } 
  }

  render() {
    const { REACT_APP_LOGIN } = process.env

    const loginJSX = this.props.user ? <div className="info-container">
        <div>Menu Button</div>
        <div>SHWIFTY LOGO</div>
        <div className="profile">
          <input type="text" placeholder="Search..." onKeyDown={e => this.search(e)} />
          <img alt="" className="avatar" src={this.props.user.img} />
        </div>
      </div> : <div className="info-container">
        <h1>SIGN IN DOE</h1>
        <Link to="/loggedin">
          <button>Log in</button>
        </Link>
      </div>

    return (
      <div>
        {loginJSX}
       
        <a href={REACT_APP_LOGIN}>
          <button>Login</button>
        </a>
        <Link to="/">
          <button className="button"> Home </button>
        </Link>
        <Link to="/profile">
          <button className="button"> profile </button>
        </Link>
        <Link to="/search">
          <button className="button"> shwiftysearch </button>
        </Link>
        <Link to="/createtab">
          <button className="button"> createtab </button>
        </Link>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUserInfo })(Header1)
