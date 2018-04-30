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
import Profile from '../Profile/Profile'
// import SaveTabButton from '../Profile/SaveTabButton'

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
//   menu: {
//     width: 200,
//   },
// });

export default class SaveTab extends React.Component {
  state = {
    open: false,
  };

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
        <Button onClick={this.handleClickOpen}>Save Tab</Button>
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
          required
          id="required"
          label="Song Name"
          margin="normal"
        />
        <div></div>
            <TextField
          label="Album Name"
          margin="normal"
        />
        <br/>
        <br/>
        <Profile/>
        <TextField
          label="Description"
          margin="normal"
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
             {/* <SaveTabButton/> */}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}