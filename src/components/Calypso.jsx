import React, { useEffect } from "react";
import { useDispatch, useTrackedState } from "../store";
import Future from "fluture/index.js";

import LoginPage from "./LoginPage";
import CryptosPage from "./CryptosPage";

import { getRatesAndAccounts } from "../services/api";
import tryLogin from "../services/auth";

import { getAssetsSuccess } from "../actions";
import { tempCodeForAccess, refreshForAccess } from "../constants/api";

export default function Calypso() {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const { refresh_token, loadedAssets } = state;
  console.log("state", state);

  useEffect(() => {
    if (refresh_token) {
      refreshForAccess(refresh_token)
        .map(e => {
          console.log(1, e);
          return e;
        })
        .chain(getRatesAndAccounts)
        .map(e => {
          console.log(2, e);
          return e;
        })
        .map(getAssetsSuccess)
        .map(e => {
          console.log(3, e);
          return e;
        })
        .fork(() => {}, dispatch);
    } else {
      tryLogin()
        .chain(tempCodeForAccess)
        .chain(getRatesAndAccounts)
        .map(getAssetsSuccess)
        .fork(() => {}, dispatch);
    }
  }, []);

  return <>{loadedAssets ? <CryptosPage /> : <LoginPage />}</>;
}
