import Future from "fluture/index.js";

import selectedAssets from "../constants/selectedAssets";
import api from "../constants/api";

import { getF, postF } from "../libs/requestsF";

import getDecimalValue from "../libs/getDecimalValue";
import { TEMPORARY_CODE } from "../constants/login";

export const getRate = rate => {
  const setRateObj = res => (res.errors ? left(res) : right(res));

  const right = ({ data }) => {
    const { amount } = data.data;
    return {
      [rate]: {
        status: "Success",
        content: { value: getDecimalValue(amount) }
      }
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
    .map(setAccountObj);
  // .fork(console.error, x => console.log(9, x));
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
  accounts.filter(account => {
    const { currency } = account;
    selectedAssets.map(name => {
      if (name === currency.code) return account;
    });
  });
};

const setAccountObj = ({ currency, balance }) => {
  const { amount } = balance;
  const { code, name } = currency;
  const value = getDecimalValue(parseFloat(amount));
  return {
    [code]: {
      status: "Success",
      content: {
        name: name,
        amount: amount,
        value: value
      }
    }
  };
};

function getAllRates() {
  const ratesList = selectedAssets.map(getRate);
  return Future.parallel(selectedAssets.length, ratesList);
}

export const getRatesAndAccounts = Future.both(
  getAccounts(),
  getAllRates()
).fork(console.error, console.log);
// export const getRatesAndAccounts = getAllRates();

export default { getAccounts, getRatesAndAccounts };
