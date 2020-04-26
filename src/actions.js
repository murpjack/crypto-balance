export const LOGIN_USER = "LOGIN_USER";
export const ASSETS_LOADED = "ASSETS_LOADED";
export const ASSETS_UNLOADED = "ASSETS_UNLOADED";

export const getAssetsSuccess = ([accounts, rates]) => ({
  type: ASSETS_LOADED,
  payload: { accounts: accounts, rates: rates }
});

export const loginUser = {
  type: LOGIN_USER,
  payload: { loggedIn: true }
};

export default {
  LOGIN_USER,
  ASSETS_LOADED,
  loginUser,
  getAssetsSuccess
};
