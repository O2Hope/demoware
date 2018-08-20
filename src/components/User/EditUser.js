import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import { updateUser } from "../../actions/userActions";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField, Modal, Typography } from "@material-ui/core";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      name: "",
      username: ""
    };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };
  handleEdit = () => {};

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props;
    const { name, username } = this.state;
    const userToUpdate = {
      name,
      username,
      id
    };
    this.props.updateUser(userToUpdate);
    this.setState({ isOpen: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { isOpen } = this.state;
    const { classes, username, name } = this.props;
    return (
      <div>
        <IconButton aria-label="Edit" onClick={this.handleOpen}>
          <EditIcon />
        </IconButton>

        <Modal open={isOpen} onClose={this.handleClose}>
          <form noValidate autoComplete="false" onSubmit={this.handleSubmit}>
            <Grid container justify="center" alignContent="center" spacing={16}>
              <div className={classes.paper}>
                <Grid item xs={12}>
                  <Typography variant="headline" component="h3">
                    Edit user
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Full name"
                    margin="normal"
                    onChange={this.handleChange}
                    fullWidth
                    helperText={`Current: ${name}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    label="Username"
                    margin="normal"
                    onChange={this.handleChange}
                    fullWidth
                    helperText={`Current: ${username}`}
                  />
                </Grid>
                <Grid container justify="flex-end">
                  <Button color="secondary" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Save changes
                  </Button>
                </Grid>
              </div>
            </Grid>
          </form>
        </Modal>
      </div>
    );
  }
}

EditUser.propTypes = {
  id: PropTypes.number.isRequired,
  updateUser: PropTypes.func.isRequired
};

const EditUserStyled = withStyles(styles)(EditUser);
export default connect(
  null,
  { updateUser }
)(EditUserStyled);
