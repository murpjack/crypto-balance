import React, { useEffect } from "react";
import { useDispatch, useTrackedState } from "../store";
import Future from "fluture/index.js";

import AccountItem from "./AccountItem";
import RateItem from "./RateItem";
import PlaceholderItem from "./PlaceholderItem";

import { getAccount, getAllRates } from "../services/api";
import tryLogin from "../services/auth";

import { ratesPayload, accountPayload } from "../actions";
import { tempCodeForAccess, refreshForAccess } from "../constants/api";

export default function Calypso() {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const { refresh_token, accountData, rates } = state;
  console.log("state", state);

  useEffect(() => {
    getAllRates()
      .map(ratesPayload)
      .fork(() => {}, dispatch);
  }, []);

  useEffect(() => {
    if (typeof rates !== "undefined") {
      if (refresh_token && rates[0].status === "Success") {
        refreshForAccess(refresh_token)
          .chain(access_token => getAccount(access_token, rates))
          .map(accountPayload)
          .fork(() => {}, dispatch);
      } else {
        tryLogin()
          .chain(tempCodeForAccess)
          .chain(access_token => getAccount(access_token, rates))
          .map(accountPayload)
          .fork(() => {}, dispatch);
      }
    }
  }, [rates]);

  function AccountDataIsLoaded() {
    if (typeof accountData !== "undefined") {
      return accountData[0].status === "Success";
    }
    return false;
  }
  return (
    <div className="assets">
      <div className="assets__content">
        <h2 className="assets__header">Current rates</h2>
        <div className="assets__list">
          {rates[0].status === "Success"
            ? rates.map((r, idx) => <RateItem key={idx} rate={r} />)
            : rates.map((r, idx) => <PlaceholderItem key={idx} rate={r} />)}
        </div>
      </div>
      <div className="assets__content">
        {AccountDataIsLoaded() ? (
          <>
            <h2 className="assets__header">Account</h2>
            <div className="assets__list">
              {accountData.map((a, idx) => (
                <AccountItem key={idx} account={a} />
              ))}
            </div>
          </>
        ) : (
          <p>Sign in with Coinbase 🥮</p>
        )}
      </div>
      <p className="signin__text">
        {"</>"} with <span className="icon--heart"></span> by Jack Murphy
      </p>
    </div>
  );
}
// : (
//   <p>Sign in with Coinbase 🥮</p>
// )}
