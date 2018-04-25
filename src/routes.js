import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import DrumData from "./components/DrumData/DrumData"
import CreateTab from "./components/CreateTab/CreateTab"
import Homepage from "./components/Homepage/Homepage"
import LoggedInHomepage from "./components/LoggedInHomepage/LoggedInHomepage"
import Profile from "./components/Profile/Profile"
import ShwiftySearch from "./components/SwiftySearch/ShwiftySearch"

export default (
  <Switch>
    <Route exact path='/' component={ Homepage } />
    <Route path='/loggedin' component={ LoggedInHomepage } />
    <Route path='/profile' component={ Profile } />
    <Route path='/search' component={ ShwiftySearch } />
    <Route path='/createtab' component={ CreateTab } />

  </Switch>
)