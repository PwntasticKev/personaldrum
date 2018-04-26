import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { getUserInfo } from '../../ducks/reducer'
import Header1 from './Header1/Header1'
import Home from './Home'
import "typeface-roboto"

 class LoggedInHomepage extends Component {
  render() {
    
    return ( 
      
      <div >
        <Header1/>
        <Home/>
      </div>
    )
  }
}

export default LoggedInHomepage