import React from "react"
import Button from "material-ui/Button"
import TextField from "material-ui/TextField"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import editsvg from "../notesimg/editsvg.svg"
import { withStyles } from "material-ui/styles"
import { connect } from "react-redux"
import { updateTab, getTabs } from "../../ducks/reducer"

const styles = theme => ({
  editButton: {
    margin: theme.spacing.unit * 1,
    width: "10px",
    borderRadius: "60px",
    color: "white",
    minWidth: "0px",
    height: "0"
  },
  textField: {
    // paddingTop: "1.56rem",
    paddingRight: "1%",
    overflow: "hidden"
  },
  cancelUpdate: {
    justifyContent: "center",
    color: "red"
  }
})

class EditButton extends React.Component {
  state = {
    open: false
  }
  //
  constructor() {
    super()
    this.state = {
      songName: "",
      albumName: "",
      artistName: ""
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  songInfo(e) {
    let { name, value } = e.target
    console.log(e.target.name)

    console.log(e.target.value)
    this.setState({
      [name]: value
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <div className="editimg">
          <Button onClick={this.handleClickOpen} className={classes.editButton}>
            <img src={editsvg} alt="editimg" />
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className="edit-container">
            <DialogTitle id="form-dialog-title">Edit Tab</DialogTitle>

            <DialogContent className={classes.textField}>
              <TextField
                margin="dense"
                id="name"
                label="Song Name"
                onChange={e => this.songInfo(e)}
                name="songName"
              />
            </DialogContent>
            <DialogContent className={classes.textField}>
              <TextField
                margin="dense"
                id="name"
                label="Album Name"
                onChange={e => this.songInfo(e)}
                name="albumName"
              />
            </DialogContent>
            <DialogContent className={classes.textField}>
              <TextField
                margin="dense"
                id="name"
                label="Artist"
                onChange={e => this.songInfo(e)}
                name="artistName"
              />
            </DialogContent>
          </div>
          <DialogActions className={classes.cancelUpdate}>
            <Button onClick={this.handleClose} color="first">
              Cancel
            </Button>
            <Button onClick={_ => this.props.updateTab() && this.handleClose()}>
              Update Groove
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { updateTab, getTabs })(
  withStyles(styles)(EditButton)
)
