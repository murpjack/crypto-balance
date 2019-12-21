import { getAccounts, requestAccess, exchangeCode } from "./scripts/apiCalls";
import Future from "fluture/index.js";

function getAccountsList() {
  const fetchF = Future.encaseP(fetch);
  const getRequestObject = fetchF(requestAccess.url, requestAccess.options);
  const responseJSON = res => Future.tryP(_ => res.json());
  const parameters = location.search.slice(1);
  const getTemporaryCode = () => codeFromParams(parameters, "code");
  const setExchangeOptions = code => exchangeCode.options(code);
  const getExchangeCode = options => fetchF(exchangeCode.url, options);
  const accessTokenValue = "abc";
  const accountsOptions = token => getAccounts.options(token);
  const accountsUrl = currency => getAccounts.url(currency);
  const getAccountData = fetchF(
    accountsUrl("GBP"),
    accountsOptions(accessTokenValue)
  );
  const successObj = obj => obj;

  getRequestObject
    .chain(responseJSON)
    //TODO: ADD left/right handler
    // L-pass,R-error
    .then(getTemporaryCode)
    .chain(setExchangeOptions)
    .chain(getExchangeCode)
    .chain(responseJSON)
    //TODO: ADD left/right handler
    .then(getAccountData)
    .chain(responseJSON)
    .value(successObj);

  return Future.of(getRequestObject);

  function codeFromParams(p, str) {
    let queryString = p.slice(1);
    if (queryString) {
      queryString = queryString.split("#")[0];
      const arr = queryString.split("&");

      let code = null;
      arr.map(a => {
        const param = a.split("=");
        if (param[0].indexOf(str) > -1) {
          code = param[1];
        }
      });
      return code;
    }
  }
}
getAccountsList();
