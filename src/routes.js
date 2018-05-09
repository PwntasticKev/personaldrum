import React from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage"
import Arduino from "./components/Arduino/Arduino"
import ShwiftySearch from "./components/SwiftySearch/ShwiftySearch"
import SheetMusic from "./components/SheetMusic/SheetMusic"
import ScrollableTabsButtonAuto from "./components/CreateTab/CreateTab"

export default (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/home" component={ShwiftySearch} />
    <Route path="/create" component={Arduino} />
    {/* <Route path="/createtab" component={ScrollableTabsButtonAuto} /> */}
    <Route path="/sheetmusic/:id" component={SheetMusic} />
    {/*to access the id you will use:  this.props.match.params.id */}
  </Switch>
)
