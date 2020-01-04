import Future from "fluture/index.js";

import { SUCCESS_REDIRECT_URI } from "./scripts/variables";
import { exchangeCode, getAccounts } from "./scripts/apiCalls";

export default function getData() {
  const getFirstTabWithParams = t =>
    t.filter(t => t.url.includes(SUCCESS_REDIRECT_URI));

  function getParameters(arr) {
    if (arr.length > 0) {
      return arr[0].url.slice(SUCCESS_REDIRECT_URI.length + 1);
    }
  }

  function codeFromParams(query) {
    if (!query) return false;

    const q = query.split("#")[0];
    const arr = q.split("&");

    let code = null;
    arr.map(a => {
      const param = a.split("=");
      if (param[0] === "code") {
        code = param[1];
        return code;
      }
    });
    return code;
  }

  const encodeTempCode = code => encodeURIComponent(code);

  function exchangeCodeForAccessToken(tempCode) {
    const accessTokenURL = exchangeCode.url(tempCode);

    const response = getAccessToken(accessTokenURL);
    console.log("res ", response);
    return response;
  }

  function getAccessToken(url) {
    const fetchF = Future.encaseP(url => fetch(url, exchangeCode.options));
    const responseJSON = res => {
      if (res.ok) return Future.tryP(_ => res.json());
    };

    return fetchF(url, exchangeCode.options)
      .chain(responseJSON)
      .map(obj => obj["access_token"]);
  }

  function getAccountsList(accessToken) {
    const fetchF = Future.encaseP(options => fetch(getAccounts.url, options));
    const responseJSON = res => {
      if (res.ok) return Future.tryP(_ => res.json());
    };
    const getAccountData = accessToken
      .chain(token => fetchF(getAccounts.options(token)))
      .chain(responseJSON)
      .map(d => d.data)
      .map(console.log)
      .value(result => result);

    const data = getAccountData;
    return data;
  }

  chrome.tabs.query({}, tabs => {
    Future.of(getFirstTabWithParams(tabs))
      .map(getParameters)
      .map(codeFromParams)
      .map(encodeTempCode)
      .map(exchangeCodeForAccessToken)
      .map(getAccountsList)
      .value(result => result);
  });

  function individualAccountData(valueSingle, { currency, balance }) {
    const { amount } = balance;
    if (amount === 0) return false;
    const { code, name } = currency;
    const value = amount * valueSingle;
    console.log(amount, value, code, name);
  }
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
