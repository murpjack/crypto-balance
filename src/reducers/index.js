import {
  ASSETS_FETCHING,
  ASSETS_FETCH_ERROR,
  ASSETS_FETCH_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER
} from "../actions/constants";

export default function reducer(state, { type, payload }) {
  switch (type) {
    case ASSETS_FETCHING:
      return {
        ...state,
        loadedAssets: payload.loaded
      };
    case ASSETS_FETCH_ERROR:
      return {
        ...state,
        loadedAssets: payload.loaded
      };
    case ASSETS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: payload.accounts,
        rates: payload.rates,
        loadedAssets: true
      };

    case LOGIN_USER:
      return {
        ...state,
        loggedIn: payload.loggedIn
      };
    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: payload.loggedIn
      };
    default:
      return state;
  }
}
