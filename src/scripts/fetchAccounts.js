import { getAccounts, requestAccess, exchangeCode } from "./scripts/apiCalls";
const accessTokenValue = "abc";
// const refreshTokenValue = "def";

// TODO: compose temporaryCode => exchangeCodeOptions
const temporaryCode = codeFromParams();
const exchangeCodeOptions = exchangeCode.options(temporaryCode);
const accountsUrl = getAccounts.url();
const accountsOptions = getAccounts.options(accessTokenValue);

// TODO: compose fetches
fetch(requestAccess.url, requestAccess.options).then(console.log);
fetch(exchangeCode.url, exchangeCodeOptions).then(console.log);
fetch(accountsUrl, accountsOptions).then(console.log);

// TODO： get code from params
// TODO： use routing
function codeFromParams() {
  return "ddd";
}
