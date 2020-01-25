import {LOGIN_USER, LOGOUT_USER } from "../constants/actions";

export default (state, {
  type,
  payload
}) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: payload
      };
    default:
      return state;
  }
}
