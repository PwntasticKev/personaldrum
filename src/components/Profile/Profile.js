import React, { Component } from 'react'
import axios from 'axios'
import Button from 'material-ui/Button'
// import SaveTabButton from './SaveTabButton'


function sendToback(photo){
  console.log(photo)
  return axios.post('/api/photoUpload', photo)
}

 class Profile extends Component {
  constructor(){
    super()

    this.state={
        file: '',
        filename: '',
        filetype: ''
    }
    this.handlePhoto=this.handlePhoto.bind(this)
    this.sendPhoto=this.sendPhoto.bind(this)
}

handlePhoto(event){
    const reader = new FileReader()
        , file = event.target.files[0]
        , _this = this
    
    reader.onload = photo => {
        this.setState({
            file: photo.target.result,
            filename: file.name,
            filetype: file.type
        })
    }
    reader.readAsDataURL(file)
}

sendPhoto(event){
    // event.preventDefault()

    sendToback(this.state).then(response => {

        console.log(response.data)
    })
}

render(){
  // this.state.file && console.log(this.state.photo)
  return (
      <div className="FileUpload">
        <input type="file" onChange={this.handlePhoto}/>
          <br/>
          {
          this.state.file &&
          <img src={this.state.file} alt="" className="file-preview"/>  
          }
          {/* <SaveTabButton sendPhoto={this.sendPhoto}/> */}
          <Button onClick={this.sendPhoto}>SAVE TABB</Button>
      </div>
  )
}
}

export default Profile