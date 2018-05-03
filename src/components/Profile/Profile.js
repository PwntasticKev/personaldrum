import React from 'react';
import { render } from 'react-dom';
import html2canvas from 'html2canvas'
// import DownloadButton from 'downloadbutton'
import Download from '@axetroy/react-download';

const element = document.createElement('div');
document.body.appendChild(element);

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      element: null,
      url: ''
    }
    this.makeFile = this.makeFile.bind(this)
  }
  componentDidMount() {
    let dog = [document.getElementById('canvas')]
    this.setState({
      element: dog
    })
   
  }
  
  makeFile() {
    console.log(this);
    
    
    
    html2canvas(this.state.element[0]).then(canvas => {
      let url = canvas.toDataURL('image/png') 
      console.log(url);
      this.setState({
        url: url
      })
      return {
        mime: 'img/png',
        filename: 'picture.png',
        contents: url
      }
      
    })}

  render() {
    


    
    return (
      <div className='canvas' id='canvas'>
      <button onClick={() => {
        console.log(this.state.element[0])
      }}>buttin</button>

      <div>
      url below
        <img src={this.state.url} alt=""/>
      </div>
      <Download file="test.png" content={this.state.url}>
          <button type="button">Click and Download file</button>
        </Download>

      <button onClick={this.makeFile}>buuton</button>
        <div className='music'>
              <div className='china' ref={this.crashput}><li></li></div>
              <div className='splash' ref={this.crashput}><li></li></div>
              <div className='crash2' ref={this.crashput}><li></li></div>
              <div className='crash' ref={this.crashput}><li></li></div>
                <div className='hihat' ref={this.hihatput}><li></li></div>
                <div>
                <div className="snare" ref={this.snareput}><li></li></div>
                </div>
              </div>
      </div>
    );
  }
}

export default Profile
// render(<Profile />, element);