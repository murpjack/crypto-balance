import React, { useEffect, useReducer } from "react";
import Future from "fluture/index.js";

import LoginPage from "./LoginPage";
import CryptosPage from "./CryptosPage";

import CalypsoContext from "../reducers/context";
import initialState from "../reducers/initialState";
import reducer from "../reducers/index";

import { assetsFetchSuccess } from "../actions/assets";
import { getAccounts, getRatesAndAccounts } from "../services/api";

import tryLogin from "../services/auth";
import { loginUser } from "../actions/login";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedIn, loadedAssets } = state;

  useEffect(() => {
    if (loggedIn) {
      if (!loadedAssets) {
        getAccounts();
      }
    } else {
      tryLogin().fork(console.error, () => loginUser(dispatch));
    }
  }, [loggedIn, loadedAssets]);

  return (
    <>
      <CalypsoContext.Provider value={{ state, dispatch }}>
        {loggedIn && loadedAssets ? <CryptosPage /> : <LoginPage />}
      </CalypsoContext.Provider>
    </>
  );
}
