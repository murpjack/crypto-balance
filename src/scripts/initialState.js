import { SELECTED } from "./variables";

const initialState = {
  isLoggedin: false,
  rateData: setData(SELECTED),
  accountData: setData(SELECTED)
};
export default initialState;

function setData(cryptoArray) {
  return cryptoArray
    .map(r => ({
      [r]: { status: "NotAsked", content: "Loading Cryptos" }
    }))
    .reduce((acc, v) => Object.assign(acc, v), {});
}
