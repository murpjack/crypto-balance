import Future from "fluture/index.js";
import { SELECTED } from "./variables";
import { getValue } from "./helpers";

export default function getRates() {
  const futures = SELECTED.map(r => getRate(r));
  return Future.parallel(SELECTED.length, futures);
}

function getRate(rate) {
  const spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;
  const fetchF = Future.encaseP(fetch);
  const responseJSON = res => Future.tryP(() => res.json());
  const createObj = res => (res.errors ? left(res) : right(res));
  const right = ({ data }) => {
    const { amount } = data;
    return {
      [rate]: {
        status: "Success",
        content: { value: getValue(amount) }
      }
    };
  };
  const left = res => ({
    [rate]: {
      status: "Failure",
      error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
    }
  });
  // Don't resolve fetchF until Future.parallel, returns transformation
  return fetchF(spotUrl)
    .chain(responseJSON)
    .map(createObj);
}
