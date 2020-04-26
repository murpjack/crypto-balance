import Future from "fluture/index.js";
import { SUCCESS_URI, TEMPORARY_CODE } from "../constants/login";

export default function tryLogin() {
  return getTabs()
    .chain(getParameters)
    .map(getCodeFromParams)
    .map(encodeTempCode)
    .map(setCodeToStorage);
}

const tabOptions = { active: true, lastFocusedWindow: true };
const getTabs = () => Future((rej, res) => chrome.tabs.query(tabOptions, res));

const getParameters = tabs => {
  return Future((rej, res) => {
    const url = tabs[0].url;
    if (url.includes(SUCCESS_URI)) {
      return res(url.slice(SUCCESS_URI.length + 1));
    }
    return rej("Login to view cryptos");
  });
};

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
  chrome.storage.local.set({ [TEMPORARY_CODE]: code });
  // localStorage.setItem(TEMPORARY_CODE, code);
  return code;
};
