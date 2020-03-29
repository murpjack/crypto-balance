import React, { useEffect } from "react";

import { useDispatch, useTrackedState } from "../store";
import Future from "fluture/index.js";

import LoginPage from "./LoginPage";
import CryptosPage from "./CryptosPage";

import { getRatesAndAccounts } from "../services/api";
import tryLogin from "../services/auth";

import { loginUser, getAssetsSuccess } from "../actions";

export default function Calypso() {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const { loggedIn, loadedAssets } = state;

  useEffect(() => {
    const errorMessage = err => console.error("Please sign in");
    if (!loggedIn) {
      tryLogin().fork(errorMessage, () => dispatch(loginUser));
    } else {
      if (!loadedAssets) {
        getRatesAndAccounts()
          .map(getAssetsSuccess)
          .fork(errorMessage, dispatch);
      }
    }
  }, [loggedIn]);

  return <>{loggedIn && loadedAssets ? <CryptosPage /> : <LoginPage />}</>;
}
