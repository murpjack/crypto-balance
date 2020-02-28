const fetch = require("node-fetch");
const Future = require("fluture");

describe("fetchRate", () => {
  it("Default state set to NotAsked", () => {
    const selectedRates = ["BTC", "ETC", "ETH", "LTC", "XRP"];
    const setDefaultState = r => ({
      [r]: {
        status: "NotAsked"
      }
    });
    const defaultState = selectedRates.map(setDefaultState);
    defaultState.map((s, idx) =>
      expect(s[selectedRates[idx]].status).toEqual("NotAsked")
    );
  });

  it("FetchRate item", () => {
    const rate = "BTC";
    const responseJSON = res => Future.tryP(_ => res.json());
    const url = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;

    const failure = res => ({
      [rate]: {
        status: "Failure",
        error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
      }
    });

    const success = res => ({
      [rate]: {
        status: "Success",
        content: res.data
      }
    });

    const createRateObject = res => (res.errors ? failure : success);
    const isSuccess = obj => expect(obj["BTC"].status).toEqual("Success");

    const fetchF = Future.encaseP(fetch);
    const newObject = fetchF(url)
      .chain(responseJSON)
      .map(createRateObject)
      .value(isSuccess);

    Future.of(newObject);
  });
});
