import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
//UI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//Components
import UserList from "./components/User/UserList";
//Styles
import "./App.css";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Users
              </Typography>
            </Toolbar>
          </AppBar>
          <UserList />
        </div>
      </Provider>
    );
  }
}

export default App;
