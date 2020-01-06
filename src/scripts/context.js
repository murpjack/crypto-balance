import React from "react";
import initialState from "./initialState";
import { LOAD_ACCOUNTS } from "./variables";

export function reducer(state, { type, payload }) {
  switch (type) {
    case LOAD_ACCOUNTS:
      return {
        isLoggedIn: !state.isLoggedIn,
        ratesData: payload.ratesData,
        accountsData: payload.accountsData
      };
    default:
      return state;
  }
}

export const CalypsoContext = React.createContext(initialState);

export default { reducer, CalypsoContext };
