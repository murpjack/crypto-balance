import "./styles/style.scss";

import React, { useEffect, useReducer } from "react";
import Future from "fluture/index.js";

import { Provider, useTracked } from './store';

import LoginPage from "./components/LoginPage";
import CryptosPage from "./components/CryptosPage";

import { getRatesAndAccounts } from "./services/api";
import tryLogin from "./services/auth";

import { loginUser, getAssetsSuccess } from "./actions";

export default function App() {
  const [state, dispatch] = useTracked();
  const { loggedIn, loadedAssets } = state;

  useEffect(() => {
    const errorMessage = err => console.error(`oh no, you have a ${err}!`);
    if (!loggedIn) {
      tryLogin()
        .fork(errorMessage, () => dispatch(loginUser));

    } else {
      if (!loadedAssets) {
        console.log("get Rates");
        getRatesAndAccounts()
          .map(getAssetsSuccess)
          .fork(errorMessage, dispatch)
      }
    }
  }, [loggedIn]);

  return (
    <>
      <Provider>
        {loggedIn && loadedAssets ? <CryptosPage /> : <LoginPage />}
      </Provider>
    </>
  );
}
