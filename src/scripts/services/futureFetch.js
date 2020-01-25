import Future from "fluture/index.js";

export const fetchF = Future.encaseP(fetch);

export const responseJSON = res => {
  if (res.ok) return Future.tryP(res.json);
};

export default { fetchF, responseJSON };
