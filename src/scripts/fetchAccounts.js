import { getAccounts, exchangeCode } from "./apiCalls";
import Future from "fluture/index.js";
import TEMPORARY_CODE from "./variables";

export default function getAccountsList() {
  const fetchF = Future.encaseP(fetch);
  const responseJSON = res => Future.tryP(_ => res.json());

  const getTemporaryCode = localStorage.getItem(TEMPORARY_CODE);
  console.log(
    1,
    localStorage.getItem(TEMPORARY_CODE) !== null,
    getTemporaryCode
  );
  const setAccessTokenOptions = code => exchangeCode.options(code);
  const accessToken = options => fetchF(exchangeCode.url, options);
  const accountUrl = currency => getAccounts.url(currency);
  const accountOptions = token => getAccounts.options(token);
  const getAccountData = fetchF(accountUrl("GBP"), accountOptions(accessToken));

  const data = getTemporaryCode;
  // .chain(setAccessTokenOptions)
  // .chain(accessToken)
  // .chain(responseJSON)
  // .then(getAccountData)
  // .chain(responseJSON)
  // .value(result => result);

  return Future.of(data);
}
