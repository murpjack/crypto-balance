import React, { useEffect } from "react";
import { useDispatch, useTrackedState } from "../store";
import { Future } from "fluture/index.js";

import Asset from "./Asset";

import { getAccount, getAllRates } from "../services/api";
import tryLogin from "../services/auth";

import { removeRefreshToken, ratesPayload, accountPayload } from "../actions";
import {
  signinUrl,
  tempCodeForAccess,
  refreshForAccess
} from "../constants/api";

export default function Calypso() {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const { refresh_token, accountData, rates } = state;

  useEffect(() => {
    getAllRates()
      .map(ratesPayload)
      .fork(() => removeRefreshToken(dispatch), dispatch);
  }, []);

  useEffect(() => {
    if (typeof rates !== "undefined") {
      if (rates[0].status === "Success") {
        if (refresh_token) {
          refreshForAccess(refresh_token)
            .chain(access_token => getAccount(access_token, rates))
            .map(accountPayload)
            .fork(() => removeRefreshToken(dispatch), dispatch);
        } else {
          tryLogin()
            .chain(tempCodeForAccess)
            .chain(access_token => getAccount(access_token, rates))
            .map(accountPayload)
            .fork(() => removeRefreshToken(dispatch), dispatch);
        }
      }
    }
  }, [rates]);

  function accountDataIsLoaded() {
    if (
      accountData &&
      typeof accountData !== "undefined" &&
      accountData.length > 0
    ) {
      return (
        accountData[0].status === "Success" ||
        (refresh_token && accountData[0].status === "NotAsked")
      );
    }
    return false;
  }

  // get total balance when there is an account with
  const accountBalance = accountDataIsLoaded()
    ? accountData
        .reduce((tot, curr) => (tot += parseFloat(curr.value)), 0)
        .toFixed(2)
    : 0;

  return (
    <div className="assets">
      <div className="assets__content">
        <h2 className="assets__header"> Current rates </h2>
        <div className="assets__list">
          {rates.map((r, idx) => (
            <Asset key={idx} asset={r} />
          ))}
        </div>
      </div>
      {accountDataIsLoaded() ? (
        <>
          <div className="assets__content">
            <h2 className="assets__header"> Account </h2>
            <div className="assets__list">
              {accountData.map((a, idx) => (
                <Asset key={idx} asset={a} />
              ))}
            </div>
          </div>
          <div className="assets__header assets__header--total">
            {"Account balance ≈ £" + accountBalance}
          </div>
        </>
      ) : (
        <SigninContent />
      )}
      <a
        className="madeby"
        href={"https://github.com/murpjack"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="icon icon--code"> {"</>"} </span> by Jack Murphy
      </a>
    </div>
  );
}

const SigninContent = () => (
  <div className="assets__content signin">
    <img className="signin__image" src="./images/logo-chrome-rotated.png" />
    <p className="signin__text"> View your cryptocurrency portfolio </p>
    <a
      className="signin__button"
      href={signinUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      Sign in with Coinbase
    </a>
  </div>
);
