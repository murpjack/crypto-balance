import Future from "fluture/index.js";

import selectedAssets from "../constants/selected";
import api from "../constants/api";

import { getF, postF } from "../libs/requestsF";

import getDecimalValue from "../libs/getDecimalValue";
import { TEMPORARY_CODE } from "../constants/login";

export const getRate = rate => {
  const setRateObj = res => (res.errors ? left(res) : right(res));

  const right = ({ data }) => {
    const { amount } = data.data;
    return {
      status: "Success",
      code: rate,
      value: getDecimalValue(amount)
    };
  };

  const left = res => ({
    [rate]: {
      status: "Failure",
      error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
    }
  });

  const url = api.rate(rate);

  return getF(url).map(setRateObj);
};

export const getAccounts = () => {
  return exchangeCodeForAccessToken()
    .chain(data => {
      const { access_token } = data;
      const { url, options } = api.accounts;
      return getF(url, options(access_token));
    })
    .map(({ data }) => getSelectedAccounts(data.data))
    .map(list => list.map(setAccountObj));
};

function exchangeCodeForAccessToken() {
  const code = localStorage.getItem(TEMPORARY_CODE);
  const { url, options } = api.tempCode;

  const token = postF(url(code), options).map(response => {
    if (response.status === 200) return response.data;
  });

  return token;
  //TODO: add setTimeout using expires_in time and refresh_token to stay loggedin
}

const getSelectedAccounts = accounts => {
  const filtered = accounts.filter(account => {
    const { currency } = account;
    for (let i = 0; i < selectedAssets.length; i++) {
      const name = selectedAssets[i];
      if (name === currency.code) return account;
    }
  });
  return filtered;
};

const setAccountObj = account => {
  const { currency, balance } = account;

  const { amount } = balance;
  const { code, name } = currency;

  const value = getDecimalValue(parseFloat(amount));
  return {
    status: "Success",
    code: code,
    name: name,
    amount: amount,
    value: value
  };
};

const addCurrentAccountValue = data => {
  const [accounts, rates] = data;
  const accountsValues = accounts.map(account => {
    const accName = account.code;
    rates.map(rate => {
      const rateName = rate.code;

      if (accName === rateName) {
        const a = account;
        const r = rate;
        a.value = getDecimalValue(a.amount * r.value);
      }
    });
    return account;
  });
  return [accountsValues, rates];
};

export function getAllRates() {
  const ratesList = selectedAssets.map(getRate);
  return Future.parallel(selectedAssets.length, ratesList);
}

export const getRatesAndAccounts = () =>
  Future.both(getAccounts(), getAllRates()).map(addCurrentAccountValue);

export default { getAccounts, getRatesAndAccounts, getAllRates };
