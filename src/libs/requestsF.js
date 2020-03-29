import Future from "fluture/index.js";
import axios from "axios";

export const postF = Future.encaseP(axios.post);

export const getF = (url, options) =>
  Future.tryP(() => axios.get(url, options));

export default { getF, postF };
