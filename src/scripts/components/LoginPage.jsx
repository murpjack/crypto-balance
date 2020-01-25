import React from "react";
import { CLIENT_ID, SUCCESS_URI } from "../constants/login";

export default function LoginPage() {
  const signinUrl =
    "https://www.coinbase.com/oauth/authorize?client_id=" +
    CLIENT_ID +
    "&redirect_uri=" +
    encodeURIComponent(SUCCESS_URI) +
    "&response_type=code&scope=wallet%3Aaccounts%3Aread&account=all";
  return (
    <div className="calypso__signin signin">
      <img className="signin__image" src="./images/logo-chrome.png" />
      <h1 className="signin__title">Calypso</h1>
      <p className="signin__text">Sign in to check your Coinbase account.</p>
      <a
        className="signin__button"
        href={signinUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Sign in
      </a>
      <p className="signin__text">Made with ❤ by Jack Murphy</p>
    </div>
  );
}
