import Future from "fluture/index.js";
import { SUCCESS_URI, TEMPORARY_CODE } from "../constants/login";

export default function tryLogin() {
  return getTabs()
    .chain(getArrayTabsIfRedirected)
    .map(getParameters)
    .map(getCodeFromParams)
    .map(encodeTempCode)
    .map(setCodeToStorage);
}

const getTabs = () => Future((rej, res) => chrome.tabs.query({}, res));

const getArrayTabsIfRedirected = query => {
  return Future((rej, res) => {
    const errorMsg = "Login to view cryptos";
    const tabs = query.filter(t => t.url.includes(SUCCESS_URI));
    return tabs.length === 0 ? rej(errorMsg) : res(tabs);
  });
};

const getParameters = arr => arr[0].url.slice(SUCCESS_URI.length + 1);

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

const setCodeToStorage = code => {
  localStorage.setItem(TEMPORARY_CODE, code);
  return code;
};