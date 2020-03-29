export const LOGIN_USER = "LOGIN_USER";
export const ASSETS_FETCH_SUCCESS = "ASSETS_FETCH_SUCCESS";

export const getAssetsSuccess = ([accounts, rates]) => ({
  type: ASSETS_FETCH_SUCCESS,
  payload: { accounts: accounts, rates: rates }
});

export const loginUser = {
  type: LOGIN_USER,
  payload: { loggedIn: true }
};

export default {
  LOGIN_USER,
  ASSETS_FETCH_SUCCESS,
  loginUser,
  getAssetsSuccess
};
