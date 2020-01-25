import {
  ASSETS_FETCHING,
  ASSETS_FETCH_ERROR,
  ASSETS_FETCH_SUCCESS
} from "../constants/actions";

// Expects a boolean
export const assetsFetching = ({ loaded }) =>
  dispatch({
    type: ASSETS_FETCHING,
    loadedAccountsAndRates: loaded
  });

// Data didn't load for whatever reason
export const assetsFetchError = ({ loaded }) =>
  dispatch({
    type: ASSETS_FETCH_ERROR,
    loadedAccountsAndRates: loaded
  });

export const assetsFetchSuccess = ({ accounts, rates }) =>
  dispatch({
    type: ASSETS_FETCH_SUCCESS,
    accounts: accounts,
    rates: rates
  });
