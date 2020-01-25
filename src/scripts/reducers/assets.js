import {
  ASSETS_FETCHING,
  ASSETS_FETCH_ERROR,
  ASSETS_FETCH_SUCCESS
} from "../constants/actions";

export default (state, {
  type,
  payload
}) => {
  switch (type) {
    case ASSETS_FETCHING:
      return {
        ...state,
        loadedAccountsAndRates: payload
      };
    case ASSETS_FETCH_ERROR:
      return {
        ...state,
        loadedAccountsAndRates: false
      };
    case ASSETS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: payload,
        rates: payload,
        loadedAccountsAndRates: true
      };
    default:
      return state;
  }
}
