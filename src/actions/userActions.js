import { GET_USERS, ADD_USER, DELETE_USER, UPDATE_USER } from "./types";

export const fetchUsers = () => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users =>
      dispatch({
        type: GET_USERS,
        payload: users
      })
    );
};

export const newUser = (name, username) => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "post",
    body: JSON.stringify({
      name,
      username
    }),
    headers: {
      "content-tye": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(user => {
      user.name = name;
      user.username = username;
      dispatch({
        type: ADD_USER,
        payload: user
      });
    });
};

export const deleteUser = id => dispatch => {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "delete"
  }).then(() =>
    dispatch({
      type: DELETE_USER,
      payload: id
    })
  );
};

export const updateUser = user => dispatch => {
  const { id, name, username } = user;
  debugger;
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "put",
    body: JSON.stringify({
      id,
      username,
      name
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(() =>
      dispatch({
        type: UPDATE_USER,
        payload: user
      })
    );
};
