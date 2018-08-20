import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxRounded from "@material-ui/icons/AccountBoxRounded";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import Popover from "@material-ui/core/Popover";
import { IconButton } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  handleOpen = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { name, username, id } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <ListItem button>
          <ListItemIcon>
            <AccountBoxRounded />
          </ListItemIcon>
          <ListItemText primary={name} secondary={username} />
          <ListItemSecondaryAction>
            <Popover
              id="simple-popper"
              open={open}
              onClose={this.handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              <DeleteUser key={1} id={id} />
              <EditUser key={2} id={id} name={name} username={username} />
            </Popover>
            <IconButton onClick={this.handleOpen}>
              <MoreVert />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(User);
