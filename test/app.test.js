const fetchMock = require("fetch-mock")
const fetch = require("node-fetch")
const Future = require('fluture')

describe("fetchRate", () => {

  it("Default state set to NotAsked", () => {
    const selectedRates = ["BTC", "ETC", "ETH", "LTC", "XRP"];
    const setDefaultState = r => ({
      [r]: {
        status: "NotAsked"
      }
    });
    const defaultState = selectedRates.map(setDefaultState);
    defaultState.map((s, idx) => expect(s[selectedRates[idx]].status).toEqual("NotAsked"))
  });

  it("FetchRate item", () => {
    const url = "https://api.coinbase.com/v2/prices/BTC-GBP/spot";
    const response = {
      "data": {
        "amount": "5853.81420561",
        "base": "BTC",
        "currency": "GBP",
      }
    };

    fetchMock.mock(url, 200)
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          expect(res).toEqual(response)
        }
      })
      .catch(err => `Oops! ${err.message}`)
  });

});
