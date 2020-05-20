import { useReducer } from "react";
import { createContainer } from "react-tracked";
import selectedAssets from "./constants/selected";

import { REFRESH_TOKEN, ACCOUNT_CODES } from "./constants/login";
import { ACCOUNT_LOADED, RATES_LOADED, REFRESH_TOKEN_REMOVED } from "./actions";

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
    case REFRESH_TOKEN_REMOVED:
      return {
        ...state,
        refresh_token: null
      };
    default:
      return state;
  }
}
const accountCodes = localStorage.getItem(ACCOUNT_CODES);

export const initialState = {
  refresh_token: localStorage.getItem(REFRESH_TOKEN) ?
    localStorage.getItem(REFRESH_TOKEN) : null,
  rates: setRateData(selectedAssets),
  // ACCOUNT_CODES is an array of codes used to create a smooth on loading account assets UX
  accountData: accountCodes ?
    setAccountData(JSON.parse(accountCodes)) : null
};

function setRateData(cryptoArray) {
  return cryptoArray.map(rate => ({
    status: "NotAsked",
    code: rate,
    value: "0.00",
    imageName: rate.toLowerCase()
  }));
  // .reduce((acc, v) => Object.assign(acc, v), {});
}

function setAccountData(cryptoArray) {
  return cryptoArray.map(rate => ({
    status: "NotAsked",
    code: rate,
    amount: "0.000000",
    value: "0.00",
    imageName: rate.toLowerCase()
  }));
  // .reduce((acc, v) => Object.assign(acc, v), {});
}

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue);