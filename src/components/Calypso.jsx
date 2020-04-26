import React, { useEffect } from "react";
import { useDispatch, useTrackedState } from "../store";
import Future from "fluture/index.js";

import LoginPage from "./LoginPage";
import CryptosPage from "./CryptosPage";

import {
  getTempCode,
  checkTempCode,
  getRatesAndAccounts
} from "../services/api";

import { ASSETS_UNLOADED, getAssetsSuccess } from "../actions";
import { TEMPORARY_CODE, REFRESH_TOKEN, EXPIRES_IN } from "../constants/login";

export default function Calypso() {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const { loadedAssets } = state;

  useEffect(() => {
    // if tempCode in Storage
    //    getData ->
    //      (err -> remove token/refresh/expires from storage, unload assets)
    //      (res -> setData)
    getTempCode()
      .chain(checkTempCode)
      .chain(getRatesAndAccounts)
      .map(getAssetsSuccess)
      .fork(clearLocalStorage, dispatch);

    function clearLocalStorage() {
      dispatch({ type: ASSETS_UNLOADED });
      chrome.storage.local.remove([TEMPORARY_CODE, REFRESH_TOKEN, EXPIRES_IN]);
    }
  }, []);

  return <>{loadedAssets ? <CryptosPage /> : <LoginPage />}</>;
}
