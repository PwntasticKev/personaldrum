import React from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage"
import Arduino from "./components/Arduino/Arduino"
import ShwiftySearch from "./components/SwiftySearch/ShwiftySearch"
import SheetMusic from "./components/SheetMusic/SheetMusic"

export default (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/home" component={ShwiftySearch} />
    <Route path="/create" component={Arduino} />
    <Route path="/sheetmusic/:id" component={SheetMusic} />
  </Switch>
)
