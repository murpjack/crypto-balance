const fetch = require("node-fetch");

const spotUrl = `https://api.coinbase.com/v2/prices/BTC-GBP/spot`;
const getCrypto = fetch(spotUrl).then(res => res.json());
console.log(getCrypto);

describe("get crypto data", () => {
  beforeEach(() => console.log("Starting another test!"));
  test("fetch happens", () => {
    const input = `https://api.coinbase.com/v2/prices/BTC-GBP/spot`;
    // const output
    expect(output).not.toBeNull();
  });
  afterEach(() => console.log("Test complete!"));
});