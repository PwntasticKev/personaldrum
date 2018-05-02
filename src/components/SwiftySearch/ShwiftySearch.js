import React, { Component } from 'react'
import Header1 from '../LoggedInHomepage/Header1/Header1'
import { connect } from 'react-redux'
import { getTabs } from '../../ducks/reducer'
import './ShwiftySearch.css'

 class ShwiftySearch extends Component {

  componentDidMount() {
    this.props.getTabs()
  }
  
render() {


  const tabinfo = this.props.totalTabs.map(obj => {
   return <div key={obj.id} className='cards'>
    <div>{obj.songname}</div>
       <div>
        {<img src={obj.songimg} alt='`img no work`'/>}
       </div>
     <div>
      {obj.album}
     </div>
       <div>
        SONG DESCRIPTION
      </div>
       <div>
        FAVORITE SHARE DOWNLOAD
      </div>
     </div>
    })
    return <div className='main-container-search'>
        <Header1 />
        <div>
          Search For Grooves
        </div>
        <div>
          <input className='searchbox' type="text" placeholder="Shwifty Search..." onChange={e => (e.target.value !== "" ? this.props.getTabs(e.target.value)
           : this.props.getTabs(e.target.value === 0))} />
        </div>
        <div className="card-container">
        {tabinfo}
        </div>
      </div>
  }
}
function mapStateToProps(state) {
return state
}

export default connect(mapStateToProps,{getTabs})(ShwiftySearch)
