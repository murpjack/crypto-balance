import "./styles/style.scss";

import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";

import Future from "fluture/index.js";

import LoginPage from "./components/LoginPage";
import CryptosPage from "./components/CryptosPage";

import CalypsoContext from "./reducers/context";
import initialState from "./reducers/initialState";
import reducer from "./reducers/index";

import { getRatesAndAccounts } from "./services/api";
import tryLogin from "./services/auth";

import { loginUser } from "./actions/login";
import { getAssetsSuccess } from "./actions/assets";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedIn, loadedAssets } = state;

  useEffect(() => {
    if (!loggedIn) {
      tryLogin().fork(
        err => console.error(`oh no, you have a ${err}!`),
        () => dispatch(loginUser)
      );
    } else {
      if (!loadedAssets) {
        console.log("get Rates");
        getRatesAndAccounts().fork(
          err => console.error(`oh no, you have a ${err}!`),
          data => {
            const assets = getAssetsSuccess(data);
            dispatch(assets);
          }
        );
      }
    }
  }, [loggedIn]);

  return (
    <>
      <CalypsoContext.Provider value={{ state, dispatch }}>
        {loggedIn && loadedAssets ? <CryptosPage /> : <LoginPage />}
      </CalypsoContext.Provider>
    </>
  );
}

const container = document.getElementById("app");
ReactDOM.render(<App />, container);
