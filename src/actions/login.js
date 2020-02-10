import { LOGIN_USER, LOGOUT_USER } from "./constants";

// Login if tempCode returned in redirect url
export const loginUser = {
  type: LOGIN_USER,
  payload: { loggedIn: true }
};

export const logoutUser = {
  type: LOGOUT_USER,
  payload: { loggedIn: false }
};

export default {
  loginUser,
  logoutUser
};
