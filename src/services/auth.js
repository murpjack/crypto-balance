import Future from "fluture/index.js";
import { SUCCESS_URI, TEMPORARY_CODE } from "../constants/login";

export default function tryLogin() {
  return getTempCode()
    .chain(checkTempCode)
    .chain(getTabs)
    .chain(getParameters)
    .map(codeFromParams);
}

const getTempCode = () => {
  return Future((rej, res) => chrome.storage.local.get([TEMPORARY_CODE], res));
};

// storage API returns a string or an empty object, handle outcome
// If value is an object get a tempCode
const checkTempCode = data => {
  return Future((rej, res) => {
    if (typeof data === "string") {
      return rej();
    }
    return res("Not logged in");
  });
};

const tabOptions = { active: true, lastFocusedWindow: true };
const getTabs = () => Future((rej, res) => chrome.tabs.query(tabOptions, res));

const getParameters = tabs => {
  return Future((rej, res) => {
    if (tabs.length > 0) {
      const url = tabs[0].url;
      if (url.includes(SUCCESS_URI)) {
        return res(url.slice(SUCCESS_URI.length + 1));
      }
      return rej("Login to view cryptos");
    }
    return rej("Login to view cryptos");
  });
};

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
