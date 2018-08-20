import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER
} from "../actions/types";

const initialState = {
  items: [],
  newUser: null,
  deleteUser: null,
  updatedUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        items: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        newUser: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        deleteUser: action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        updatedUser: action.payload
      };
    default:
      return state;
  }
}
