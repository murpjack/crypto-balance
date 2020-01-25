import * as loginReducer from "./login";
import * as assetsReducer from "./assets";
import combineReducers from "react-combine-reducers";
import initialState from "../services/initialState";

const [rootReducerCombined, initialStateCombined] = combineReducers({
  loginReducer: [loginReducer, initialState],
  assetsReducer: [assetsReducer, initialState]
});

export default [rootReducerCombined, initialStateCombined];
