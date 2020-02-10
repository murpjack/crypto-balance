import {
  ASSETS_FETCHING,
  ASSETS_FETCH_ERROR,
  ASSETS_FETCH_SUCCESS
} from "./constants";

// Expects a boolean
export const assetsFetching = (dispatch, { loaded }) =>
  dispatch({
    type: ASSETS_FETCHING,
    payload: { loadedAssets: loaded }
  });

// Data didn't load for whatever reason
export const assetsFetchError = (dispatch, { loaded }) =>
  dispatch({
    type: ASSETS_FETCH_ERROR,
    payload: { loadedAssets: loaded }
  });

export const getAssetsSuccess = ([accounts, rates]) => ({
  type: ASSETS_FETCH_SUCCESS,
  payload: { accounts: accounts, rates: rates }
});

export default {
  getAssetsSuccess
};
