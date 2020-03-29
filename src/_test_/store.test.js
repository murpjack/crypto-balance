import { reducer, initialState } from "../store";

describe("INITIAL STATE", () => {
  it("loads correctly", () => {
    const action = {
      type: "DUMMY_ACTION",
      payload: "Dummy action"
    };
    expect(reducer(undefined, action)).toEqual(initialState);
  });
});
