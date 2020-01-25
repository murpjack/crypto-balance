import { LOGIN_USER, LOGOUT_USER } from "../constants/actions";

// Login if tempCode returned in redirect url
export const loginUser = payload =>
  dispatch({
    type: LOGIN_USER,
    loggedIn: payload
  });
export const logoutUser = payload =>
  dispatch({
    type: LOGOUT_USER,
    loggedIn: payload
  });

export default {
  loginUser,
  logoutUser
};
