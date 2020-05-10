import Future from "fluture/index.js";

import selectedAssets from "../constants/selected";
import { getAccountData, getRateData } from "../constants/api";
import { ACCOUNT_CODES } from "../constants/login";

export const getRate = rate => {
  const left = res => ({
    status: "Failure",
    code: rate,
    error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
  });

  const right = ({ data }) => {
    const { amount } = data.data;
    return {
      status: "Success",
      code: rate,
      imageName: rate.toLowerCase(),
      value: getDecimalValue(amount)
    };
  };

  return getRateData(rate).map(res => (res.errors ? left(res) : right(res)));
};

export function getAllRates() {
  const ratesList = selectedAssets.map(getRate);
  return Future.parallel(selectedAssets.length, ratesList);
}

// export function getAllRates() {
//   const left = res => ({
//     status: "Failure",
//     error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
//   });
//
//   const right = res => {
//     // rates = object
//     const rates = res.data.data.rates;
//     // so we map through an array of rate[keys] --> setRateData
//     const ratesArray = selectedAssets.map(code => {
//       const value = rates[code];
//       console.log("rate", code, value);
//       return {
//         status: "Success",
//         code,
//         imageName: code.toLowerCase(),
//         value: getDecimalValue(value)
//       };
//     });
//     return {
//       status: "Success",
//       rates: ratesArray
//     };
//   };
//
//   return getRateData()
//     .map(e => {
//       console.log("e", e);
//       return e;
//     })
//     .map(res => (res.errors ? left(res) : right(res)));
// }

export function getAccount(access_token, rates) {
  return getAccountData(access_token)
    .map(getSelectedAssets)
    .map(assets => setAccountData(assets, rates))
    .map(assets => [...assets].sort(alphabetiseAssets));
}

function getSelectedAssets(assets) {
  const accountData = assets.data.data;
  const filtered = accountData.filter(account => {
    for (let i = 0; i < selectedAssets.length; i++) {
      const name = selectedAssets[i];
      const balance = account.balance.amount;
      // Check that currency is in use
      if (name === account.currency.code && parseFloat(balance) !== 0)
        return account;
    }
  });
  localStorage.setItem(ACCOUNT_CODES, filtered);
  return filtered;
}

function setAccountData(accountData, rates) {
  return accountData.map(account => {
    const { currency, balance } = account;
    const { amount } = balance;
    const { code } = currency;
    const imageName = code.toLowerCase();
    const r = rates.filter(rate => code === rate.code)[0];
    const value = getDecimalValue(amount * r.value);
    const asset = {
      status: "Success",
      code,
      imageName,
      amount,
      value
    };
    return asset;
  });
}

function alphabetiseAssets(a, b) {
  // Use toUpperCase() to ignore character casing
  const assetA = a.code.toUpperCase();
  const assetB = b.code.toUpperCase();

  let comparison = 0;
  if (assetA > assetB) {
    comparison = 1;
  } else if (assetA < assetB) {
    comparison = -1;
  }
  return comparison;
}

function getDecimalValue(amount) {
  const roundUpValue = parseFloat(amount).toFixed(2);
  return roundUpValue;
}

export default { getAllRates, getAccount };
