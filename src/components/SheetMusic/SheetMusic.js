import React, { Component } from 'react'
import { render } from 'react-dom';


 class SheetMusic extends Component {
   render() {
    console.log(this.props.match.params);
    
    return (
      <div>
        <section>
          stuff
        </section>
      </div>
    )
  }
}

export default SheetMusic
