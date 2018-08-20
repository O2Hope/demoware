import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { newUser } from "../../actions/userActions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styleBtn = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed"
};

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: "",
      user: ""
    };
  }
  handleOpen = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { name, user } = this.state;
    this.props.newUser(name, user);
    this.setState({ isOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <Button
          style={styleBtn}
          variant="fab"
          color="primary"
          aria-label="Add"
          onClick={this.handleOpen}
        >
          <AddIcon />
        </Button>
        <Modal open={isOpen} onClose={this.handleClose}>
          <form noValidate autoComplete="false" onSubmit={this.handleSubmit}>
            <Grid container justify="center" alignContent="center" spacing={16}>
              <div className={classes.paper}>
                <Grid item xs={12}>
                  <Typography variant="headline" component="h3">
                    Add user
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Full name"
                    margin="normal"
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="user"
                    label="User name"
                    margin="normal"
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid container justify="flex-end">
                  <Button color="secondary" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Add
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

AddUser.propTypes = {
  newUser: PropTypes.func.isRequired
};

const AddUserStyled = withStyles(styles)(AddUser);
export default connect(
  null,
  { newUser }
)(AddUserStyled);
