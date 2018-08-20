import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/userActions";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import User from "./Index";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import AddUser from "./AddUser";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBar: false,
      text: ""
    };

    this.handleSnackBar = this.handleSnackBar.bind(this);
  }

  handleSnackBar() {
    this.setState({ snackBar: false });
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { deleteUser, newUser, updatedUser } = nextProps;
    if (newUser !== this.props.newUser) {
      this.props.users.unshift(newUser);
      this.setState({ snackBar: true, text: "User Added" });
    }
    if (nextProps.deleteUser !== this.props.deleteUser) {
      const userToDelete = this.props.users.findIndex(
        user => user.id === deleteUser
      );
      this.props.users.splice(userToDelete, 1);
      this.setState({ snackBar: true, text: "User Deleted" });
    }
    if (updatedUser !== this.props.updatedUser) {
      const { name, username, id } = updatedUser;
      const userToUpdate = this.props.users.findIndex(user => user.id === id);
      this.props.users[userToUpdate].name = name;
      this.props.users[userToUpdate].username = username;
      this.setState({ snackBar: true, text: "User Updated" });
    }
  }

  renderUsers(users) {
    return users.map(user => (
      <User
        key={user.id}
        id={user.id}
        name={user.name}
        username={user.username}
        email={user.email}
      />
    ));
  }

  render() {
    const { users } = this.props;
    const { snackBar, text } = this.state;
    return (
      <div>
        <List component="nav">
          <Grid container spacing={16}>
            <Grid item xs={12}>
              {users && this.renderUsers(users)}
            </Grid>
          </Grid>
        </List>
        <AddUser />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snackBar}
          autoHideDuration={3000}
          onClose={this.handleSnackBar}
          message={<span id="message-id">{text}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackBar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

UserList.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  newUser: PropTypes.object,
  deleteUser: PropTypes.number,
  updatedUser: PropTypes.object
};

const mapStateToProps = state => ({
  users: state.users.items,
  newUser: state.users.newUser,
  deleteUser: state.users.deleteUser,
  updatedUser: state.users.updatedUser
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UserList);
