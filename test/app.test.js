const fetchMock = require("fetch-mock")
const fetch = require("node-fetch")
const Future = require('fluture')
const response = {
  hello: "world"
};

describe("fetchRate", () => {
  it("state updates on successful fetch", () => {
    const url = "https://api.coinbase.com/v2/prices/BTC-GBP/spot";
    fetchMock.mock(url, 200)
    fetch(url)
      .then(res => res.json())
      .then(res => expect(res).toEqual(response))
      .catch(err => `Oops! ${err.message}`)
  });
});
