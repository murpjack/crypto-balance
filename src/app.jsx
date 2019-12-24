import "./styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";
import Future from "fluture/index.js";
// import { createStore } from "redux";
import {
  CLIENT_ID,
  SUCCESS_REDIRECT_URI,
  TEMPORARY_CODE
} from "./scripts/variables";
Future.of(12);

//TODO: compose this!!!
chrome.tabs.query({}, tabs => {
  const getSuccessTab = getTabParams(tabs);
  const getParameters = t => t[0].url.slice(SUCCESS_REDIRECT_URI.length + 1);
  const parameters = getParameters(getSuccessTab);

  const tempCode = codeFromParams(parameters, "code");
  const encodeTempCode = code => encodeURIComponent(code);
  const codeToStorage = code => localStorage.setItem(TEMPORARY_CODE, code);

  const encoded = encodeTempCode(tempCode);
  codeToStorage(encoded);
});

function getTabParams(t) {
  return t.filter(t => t.url.includes(SUCCESS_REDIRECT_URI));
}

function codeFromParams(query, str) {
  if (!query) return false;

  const q = query.split("#")[0];
  const arr = q.split("&");

  let code = null;
  arr.map(a => {
    const param = a.split("=");
    if (param[0] === str) {
      code = param[1];
      return code;
    }
  });
  return code;
}

// const rateData = setData(SELECTED);
// const accountData = setData(SELECTED);

// function setData(cryptoList) {
//   return cryptoList
//     .map(r => ({
//       [r]: { status: "NotAsked", content: "Loading Cryptos" }
//     }))
//     .reduce((acc, v) => Object.assign(acc, v), {});
// }

// const initialState = {
//   isLoggedin: false,
//   rateData: rateData,
//   accountData: accountData
// };

// const store = createStore(console.log("fun"), initialState);
// console.log(1, store);

const HeaderBanner = () => (
  <div className="header">
    <h1 className="header__title">Calypso</h1>
  </div>
);

function AccountsList(list) {
  return CryptoList("My Portfolio", list, GetAccountItem);
}
function RatesList(list) {
  return CryptoList("Prices", list, GetRateItem);
}

function GetRateItem() {
  return ListItem("rate");
}
function GetAccountItem() {
  return ListItem("account");
}

function CryptoList(title, list, GetItem) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>{list.map(GetItem)}</ul>
    </div>
  );
}
CryptoList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  GetItem: PropTypes.func.isRequired
};

function ListItem(crypto) {
  const ValueContent = GetValueContent(crypto);
  return (
    <li>
      <div>{crypto.icon}</div>
      <div>
        <p>{crypto.fullname}</p>
        <p>{crypto.abreviated}</p>
      </div>
      <div className={"crypto--" + crypto}>
        <ValueContent />
      </div>
    </li>
  );
}
ListItem.propTypes = {
  crypto: PropTypes.object.isRequired
};

function GetValueContent(crypto) {
  switch (crypto.content) {
    case "rateData":
      return (
        <div>
          <p>{crypto.price}</p>
          <p>{crypto.quantity}</p>
        </div>
      );
    case "accountData":
      return (
        <div>
          <p>{crypto.price}</p>
        </div>
      );
  }
}
GetValueContent.propTypes = {
  crypto: PropTypes.object.isRequired
};

const Calypso = () => {
  const isLoggedin = false;
  return <div>{isLoggedin ? <CryptosPage /> : <LoginPage />}</div>;
};

function LoginPage() {
  const signinUrl =
    "https://www.coinbase.com/oauth/authorize?client_id=" +
    CLIENT_ID +
    "&redirect_uri=" +
    encodeURIComponent(SUCCESS_REDIRECT_URI) +
    "&response_type=code&scope=wallet%3Aaccounts%3Aread&account=all";
  return (
    <div className="calypso__signin signin">
      <img className="signin__image" />
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
function CryptosPage() {
  return (
    <div>
      <HeaderBanner />
      <RatesList />
      <AccountsList />
    </div>
  );
}

const container = document.getElementById("app");
ReactDOM.render(<Calypso />, container);
