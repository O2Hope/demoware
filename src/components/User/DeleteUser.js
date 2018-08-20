import React, { Component } from "react";
import PropTypes from "prop-types";
import { deleteUser } from "../../actions/userActions";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { id } = this.props;
    this.props.deleteUser(id);
  }
  render() {
    return (
      <IconButton onClick={this.handleDelete} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    );
  }
}
DeleteUser.prototypes = {
  deleteUser: PropTypes.func.isRequired
};
export default connect(
  null,
  { deleteUser }
)(DeleteUser);
