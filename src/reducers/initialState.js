import selectedAssets from "../constants/selectedAssets";

export const initialState = {
  selectedAssets: selectedAssets,
  currency: "GBP",
  loggedIn: false,
  accounts: setData(selectedAssets),
  rates: setData(selectedAssets),
  loadedAssets: false
};

export default initialState;

function setData(cryptoArray) {
  return cryptoArray
    .map(r => ({
      [r]: { status: "NotAsked", content: "Loading Cryptos" }
    }))
    .reduce((acc, v) => Object.assign(acc, v), {});
}
