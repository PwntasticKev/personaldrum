import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { getUserInfo } from '../../ducks/reducer'
import Header1 from './Header1/Header1'
import Home from './Home'
import "typeface-roboto"
import './LoggedInHomepage.css'

 class LoggedInHomepage extends Component {
  render() {
    
    return ( 
      
      <div className='main-container'>
        <Header1/>
        <Home/>
      </div>
    )
  }
}

export default LoggedInHomepage