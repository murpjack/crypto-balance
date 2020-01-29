import { LOGIN_USER, LOGOUT_USER } from "./constants";

// Login if tempCode returned in redirect url
export const loginUser = dispatch =>
  dispatch({
    type: LOGIN_USER,
    payload: { loggedIn: true }
  });
export const logoutUser = dispatch =>
  dispatch({
    type: LOGOUT_USER,
    payload: { loggedIn: false }
  });

export default {
  loginUser,
  logoutUser
};
