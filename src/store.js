import { useReducer } from "react";
import { createContainer } from 'react-tracked';
import selectedAssets from "./constants/selected";

import {
  ASSETS_FETCH_SUCCESS,
  LOGIN_USER
} from "./actions";

export function reducer(state=initialState, { type, payload }) {
  switch (type) {
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
    default:
      return state;
  }
}

export const initialState = {
  selectedAssets: selectedAssets,
  currency: "GBP",
  loggedIn: false,
  accounts: setData(selectedAssets),
  rates: setData(selectedAssets),
  loadedAssets: false
};

function setData(cryptoArray) {
  return cryptoArray
    .map(r => ({
      [r]: { status: "NotAsked", content: "Loading Cryptos" }
    }))
    .reduce((acc, v) => Object.assign(acc, v), {});
}

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTracked
} = createContainer(useValue);

export default {
  reducer,
  initialState,
  Provider,
  useTracked
}
