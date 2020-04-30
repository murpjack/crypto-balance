import Future from "fluture/index.js";

import selectedAssets from "../constants/selected";
import { getAccountData, getRateData } from "../constants/api";
import getImageName from "../libs/getImageName";

export const getRate = rate => {
  const setRateObj = res => (res.errors ? left(res) : right(res));

  const right = ({ data }) => {
    const { amount } = data.data;
    return {
      status: "Success",
      code: rate,
      imageName: getImageName(rate),
      value: getDecimalValue(amount)
    };
  };

  const left = res => ({
    [rate]: {
      status: "Failure",
      error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
    }
  });

  return getRateData(rate).map(setRateObj);
};

export function getAllRates() {
  const ratesList = selectedAssets.map(getRate);
  return Future.parallel(selectedAssets.length, ratesList);
}

function getAccount(access_token) {
  return getAccountData(access_token)
    .map(({ data }) => getSelectedAccounts(data.data))
    .map(list => list.map(setAccountObj));
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
    imageName: getImageName(code),
    amount: amount,
    value: value
  };
};

export const getRatesAndAccounts = access_token => {
  return Future.both(getAccount(access_token), getAllRates()).map(
    addCurrentAccountValue
  );
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

function getDecimalValue(amount) {
  const roundUpValue = parseFloat(amount).toFixed(2);
  return roundUpValue;
}

export default getRatesAndAccounts;
