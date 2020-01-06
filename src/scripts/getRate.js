import Future from "fluture/index.js";
import { getValue } from "./helpers";

function getRate(rate) {
  const url = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;

  const left = res => ({
    [rate]: {
      status: "Failure",
      error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
    }
  });

  const right = res => ({
    [rate]: {
      status: "Success",
      content: getValue(res.data)
    }
  });

  const createRateObject = res => (res.errors ? left : right);
  const isSuccess = obj => obj;

  const fetchF = Future.encaseP(url => fetch(url));
  const responseJSON = res => Future.tryP(_ => res.json());

  const newObject = fetchF(url)
    .chain(responseJSON)
    .map(createRateObject)
    .value(isSuccess);

  return Future.of(newObject);
}

export default getRate;
