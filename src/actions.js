export const LOGIN_USER = "LOGIN_USER";
export const ASSETS_LOADED = "ASSETS_LOADED";
export const RATES_LOADED = "RATES_LOADED";
export const ACCOUNT_LOADED = "ACCOUNT_LOADED";
export const ASSETS_UNLOADED = "ASSETS_UNLOADED";
export const REFRESH_TOKEN_REMOVED = "REFRESH_TOKEN_REMOVED";

import { REFRESH_TOKEN } from "./constants/login";

export const accountPayload = account => ({
  type: ACCOUNT_LOADED,
  payload: { account }
});

export const ratesPayload = rates => ({
  type: RATES_LOADED,
  payload: { rates }
});

export function removeRefreshToken(dispatch) {
  localStorage.removeItem(REFRESH_TOKEN);
  dispatch({ type: REFRESH_TOKEN_REMOVED });
}

export default {
  LOGIN_USER,
  RATES_LOADED,
  ACCOUNT_LOADED,
  ASSETS_LOADED,
  REFRESH_TOKEN_REMOVED,
  ratesPayload,
  accountPayload,
  removeRefreshToken
};
