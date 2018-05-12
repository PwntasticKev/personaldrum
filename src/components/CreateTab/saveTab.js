import React from "react"
import Button from "material-ui/Button"
import TextField from "material-ui/TextField"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog"
import axios from "axios"
import html2canvas from "html2canvas"

function sendToback(state) {
  console.log(state)
  console.log("topsendtoback:", state.sheeturl)

  return axios.post("/api/uploadPhoto", state)
}
export default class SaveTab extends React.Component {
  state = {
    open: false
  }
  //-------------------------------------
  constructor() {
    super()

    this.state = {
      file: "",
      filename: "",
      filetype: "",
      songName: "",
      albumName: "",
      description: "",
      element: null,
      sheeturl: ""
    }
    this.handlePhoto = this.handlePhoto.bind(this)
    this.sendPhoto = this.sendPhoto.bind(this)
  }

  componentDidMount() {
    let sheetMusic = [document.getElementById("sheetMusic")]
    this.setState({
      element: sheetMusic
    })
    console.log("sheetmusic", sheetMusic)
  }

  handlePhoto(event) {
    const reader = new FileReader()
    const file = event.target.files[0]

    reader.onload = photo => {
      this.setState({
        file: photo.target.result,
        filename: file.name,
        filetype: file.type
      })
    }
    reader.readAsDataURL(file)
  }

  sendPhoto(event) {
    let {
      file,
      filename,
      filetype,
      songName,
      albumName,
      description,
      sheeturl,
      artist
    } = this.state
    event.preventDefault()
    console.log("send photo!")

    html2canvas(this.state.element[0]).then(canvas => {
      let url = canvas.toDataURL("image/png")
      let send = `${url}`
      this.setState(
        {
          sheeturl: send
        },
        () => {}
      )
      sendToback({
        file,
        filename,
        filetype,
        songName,
        albumName,
        description,
        sheeturl: send,
        artist
      }).then(response => {
        console.log("sebdto back", this.state)
      })
    })

    // musicDiv
    // return {
    //   mime: 'img/png',
    //   filename: 'picture.png',
    //   contents: url
    // }

    this.handleClose()
  }
  //================================

  songInfo(e) {
    let { name, value } = e.target
    // console.log(e.target.name);

    // console.log(e.target.value)
    this.setState({
      [name]: value
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true || false ? true : false })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Save DrumTab</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className="save-your-song-text">
            Save Your Song
          </DialogTitle>
          <div className="save-container">
            <DialogContent>
              <DialogContentText />
              <div className="song-album-container">
                <TextField
                  onChange={e => this.songInfo(e)}
                  required
                  id="required"
                  label="Song Name"
                  margin="normal"
                  name="songName"
                />
                <TextField
                  onChange={e => this.songInfo(e)}
                  label="Album Name"
                  margin="normal"
                  name="albumName"
                />
                <TextField
                  onChange={e => this.songInfo(e)}
                  label="Artist Name"
                  margin="normal"
                  name="artist"
                />
              </div>
              <div className="FileUpload">
                <input type="file" onChange={this.handlePhoto} />
                <br />
                {this.state.file && (
                  <img src={this.state.file} alt="" className="file-preview" />
                )}
                {/* <SaveTabButton sendPhoto={this.sendPhoto}/> */}
              </div>
            </DialogContent>
          </div>
          <div className="save-cancel">
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              {/* <Button onClick={this.handleClose} color="primary"> */}
              <Button onClick={e => this.sendPhoto(e)}>SAVE TAB</Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    )
  }
}
