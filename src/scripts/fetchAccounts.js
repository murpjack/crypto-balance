// import { getAccounts, requestAccess, exchangeCode } from "./scripts/apiCalls";
// import Future from "fluture/index.js";
import TEMPORARY_CODE from "./scripts/variables";

const getTemporaryCode = localStorage.getItem(TEMPORARY_CODE);
console.log(12，getTemporaryCode);

// function getAccountsList() {
//   const fetchF = Future.encaseP(fetch);
//   const getRequestObject = fetchF(requestAccess.url, requestAccess.options);
//   const responseJSON = res => Future.tryP(_ => res.json());
//
//   const setExchangeOptions = code => exchangeCode.options(code);
//   const getExchangeCode = options => fetchF(exchangeCode.url, options);
//   const accessTokenValue = "abc";
//   const accountsOptions = token => getAccounts.options(token);
//   const accountsUrl = currency => getAccounts.url(currency);
//   const getAccountData = fetchF(
//     accountsUrl("GBP"),
//     accountsOptions(accessTokenValue)
//   );
//   const successObj = obj => obj;
//
//   getRequestObject;
//   // .chain(responseJSON)
//   // //TODO: ADD left/right handler
//   // // L-pass,R-error
//   // .then(getTemporaryCode)
//   // .chain(setExchangeOptions)
//   // .chain(getExchangeCode)
//   // .chain(responseJSON)
//   // //TODO: ADD left/right handler
//   // .then(getAccountData)
//   // .chain(responseJSON)
//   // .value(successObj);
//
//   return Future.of(getRequestObject);
// }
// getAccountsList();
