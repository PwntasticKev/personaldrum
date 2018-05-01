import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import axios from 'axios'

function sendToback(state){
  console.log(state)
  return axios.post('/api/uploadPhoto', state)
}
export default class SaveTab extends React.Component {
  state = {
    open: false,
  };
  //-------------------------------------
  constructor(){
    super()

    this.state={
        file: '',
        filename: '',
        filetype: '',
        songName: '',
        albumName: '',
        description: ''
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

// sendPhoto(event){
//     event.preventDefault()
//     sendToback(this.state).then(response => {
//         console.log(response.data)
//     })
// }
sendPhoto(event){
  event.preventDefault()
  sendToback(this.state).then(response => {
      console.log(response.data)
  })

  this.handleClose()
  // axios.post('/drumtabs')
}
  //================================

songInfo(e) {
  let { name, value } = e.target
  console.log(e.target.name);
  
  console.log(e.target.value)
  this.setState({
    [name]: value,
  })
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Save DrumTab</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Save Your Song</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
            onChange={e => this.songInfo(e)}
          required
          id="required"
          label="Song Name"
          margin="normal"
          name='songName'
        />
        <div></div>
            <TextField
            onChange={e => this.songInfo(e)}
          label="Album Name"
          margin="normal"
          name='albumName'
        />
        <br/>
        <br/>
        <div className="FileUpload">
        <input type="file" onChange={this.handlePhoto}/>
          <br/>
          {
          this.state.file &&
          <img src={this.state.file} alt="" className="file-preview"/>  
          }
          {/* <SaveTabButton sendPhoto={this.sendPhoto}/> */}
      </div>
        <TextField
          onChange={e => this.songInfo(e)}
          label="Description"
          margin="normal"
          name='description'
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={this.handleClose} color="primary"> */}
          <Button onClick={this.sendPhoto}>SAVE TAB</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}






//////////////////////
// import React from 'react';
// import Button from 'material-ui/Button';
// import TextField from 'material-ui/TextField';
// import { withStyles } from 'material-ui/styles';
// import Dialog, {
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from 'material-ui/Dialog';
// import axios from 'axios'

// function sendToback(photo){
//   console.log(photo)
//   return axios.post('/api/photoUpload', photo)
// }

// export default class SaveTab extends React.Component {
//   state = {
//     open: false,
//   };
//   //-------------------------------------
//   constructor(){
//     super()

//     this.state={
//         file: '',
//         filename: '',
//         filetype: '',
//         songName: '',
//         albumName: '',
//         description: ''
//     }
//     this.handlePhoto=this.handlePhoto.bind(this)
//     this.sendPhoto=this.sendPhoto.bind(this)
// }

// handlePhoto(event){
//     const reader = new FileReader()
//         , file = event.target.files[0]
//         , _this = this
    
//     reader.onload = photo => {
//         this.setState({
//             file: photo.target.result,
//             filename: file.name,
//             filetype: file.type
//         })
//     }
//     reader.readAsDataURL(file)
// }

// // sendPhoto(event){
// //     event.preventDefault()
// //     sendToback(this.state).then(response => {
// //         console.log(response.data)
// //     })
// // }
// sendPhoto(event){
//   event.preventDefault()
//   sendToback(this.state).then(response => {
//       console.log(response.data)
//   })
//   let {file, filename, filetype,songName, albumName,description } = this.state,
//         photo = {file, filename, filetype }
//   axios.post('/api/photoUpload', {photo, songName, albumName,description}).then(res => {
//     console.log('working????');
    
//   }).catch(console.log)

//   this.handleClose()
// }
  //================================

// songInfo(e) {
//   console.log(e.target.value)
//   this.setState({
//     songName: e.target.value,
//     albumName: e.target.value,
//     description: e.target.value
//   })
// }

//   handleClickOpen = () => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   render() {
//     const { classes } = this.props;
//     return (
//       <div>
//         <Button onClick={this.handleClickOpen}>Save DrumTab</Button>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">Save Your Song</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
              
//             </DialogContentText>
//             <TextField
//             onChange={e => this.songInfo(e)}
//           required
//           id="required"
//           label="Song Name"
//           margin="normal"
//         />
//         <div></div>
//             <TextField
//             onChange={e => this.songInfo(e)}
//           label="Album Name"
//           margin="normal"
//         />
//         <br/>
//         <br/>
//         <div className="FileUpload">
//         <input type="file" onChange={this.handlePhoto}/>
//           <br/>
//           {
//           this.state.file &&
//           <img src={this.state.file} alt="" className="file-preview"/>  
//           }
//           {/* <SaveTabButton sendPhoto={this.sendPhoto}/> */}
//       </div>
//         <TextField
//           onChange={e => this.songInfo(e)}
//           label="Description"
//           margin="normal"
//         />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary">
//               Cancel
//             </Button>
//             {/* <Button onClick={this.handleClose} color="primary"> */}
//           <Button onClick={this.sendPhoto}>SAVE TAB</Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }
// }