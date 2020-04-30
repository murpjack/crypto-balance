import { useReducer } from "react";
import { createContainer } from "react-tracked";
import selectedAssets from "./constants/selected";

import { REFRESH_TOKEN } from "./constants/login";
import { ASSETS_LOADED, ASSETS_UNLOADED } from "./actions";

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ASSETS_LOADED:
      return {
        ...state,
        accounts: payload.accounts,
        rates: payload.rates,
        loadedAssets: true
      };
    case ASSETS_UNLOADED:
      return {
        ...state,
        accounts: setData(selectedAssets),
        rates: setData(selectedAssets),
        loadedAssets: false
      };
    default:
      return state;
  }
}

export const initialState = {
  refresh_token: localStorage.getItem(REFRESH_TOKEN)
    ? localStorage.getItem(REFRESH_TOKEN)
    : null,
  rates: setData(selectedAssets),
  accounts: setData(selectedAssets),
  loadedAssets: false
};

function setData(cryptoArray) {
  return cryptoArray
    .map(r => ({
      [r]: {
        status: "NotAsked",
        content: "Loading Cryptos"
      }
    }))
    .reduce((acc, v) => Object.assign(acc, v), {});
}

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue);
