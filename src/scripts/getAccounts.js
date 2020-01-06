import Future from "fluture/index.js";
import { SUCCESS_URI } from "./variables";
import { exchangeCode, getAccounts } from "./apiCalls";

const getFirstTabWithParams = t => t.filter(t => t.url.includes(SUCCESS_URI));

function getParameters(arr) {
  if (arr.length > 0) {
    return arr[0].url.slice(SUCCESS_URI.length + 1);
  }
}

function getCodeFromParams(query) {
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
  //TODO: add setTimeout using expires_in time and refresh_token to stay loggedin
}

export default function accountData(updateState) {
  // AccountData
  function getAccountData(accessToken) {
    const fetchF = Future.encaseP(options => fetch(getAccounts.url, options));
    const responseJSON = res => {
      if (res.ok) return Future.tryP(_ => res.json());
    };

    const accountData = accessToken
      .chain(token => fetchF(getAccounts.options(token)))
      .chain(responseJSON)
      .map(d => d.data)
      .map(updateState)
      .map(c => {
        console.log(36, c);
        return c;
      })
      .value(result => result);

    return accountData;
  }

  return chrome.tabs.query({}, tabs => {
    return Future.of(getFirstTabWithParams(tabs))
      .map(getParameters)
      .map(getCodeFromParams)
      .map(encodeTempCode)
      .map(exchangeCodeForAccessToken)
      .map(getAccountData)
      .value(result => result);
  });
}
