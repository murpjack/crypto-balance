import { useReducer } from "react";
import { createContainer } from "react-tracked";
import selectedAssets from "./constants/selected";

import { REFRESH_TOKEN } from "./constants/login";
import { ACCOUNT_LOADED, RATES_LOADED } from "./actions";

import getImageName from "./libs/getImageName";
import getFullName from "./libs/getFullName";

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case RATES_LOADED:
      return {
        ...state,
        rates: payload.rates
      };
    case ACCOUNT_LOADED:
      return {
        ...state,
        accountData: payload.account
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
  accountData: setData(selectedAssets)
};

function setData(cryptoArray) {
  return cryptoArray.map(rate => ({
    status: "NotAsked",
    code: rate,
    content: "Loading",
    name: getFullName(rate),
    imageName: getImageName(rate)
  }));
  // .reduce((acc, v) => Object.assign(acc, v), {});
}

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue);
