import React from "react";
import initialState from "./initialState";
import { USER_LOGIN, LOAD_ACCOUNTS } from "./variables";

export function reducer(state, { type, payload }) {
  switch (type) {
    case USER_LOGIN:
      return {
        isLoggedin: payload.isLoggedin,
        currency: state.currency,
        rateData: payload.ratesData,
        accountData: state.accountsData
      };
    case LOAD_ACCOUNTS:
      return {
        isLoggedin: state.isLoggedin,
        currency: payload.currency,
        rateData: payload.ratesData,
        accountData: payload.accountsData
      };
    default:
      return state;
  }
}

export const CalypsoContext = React.createContext(initialState);

export default { reducer, CalypsoContext };
