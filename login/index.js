// const TEMPORARY_CODE = "TEMPORARY_CODE";
//
// const parameters = location.search.slice(1);
// const getTemporaryCode = () => codeFromParams(parameters, "code");
// const encodeTempCode = code => encodeURIComponent(code);
// const codeToStorage = code => localStorage.setItem(TEMPORARY_CODE, code);
//
// const tempCode = getTemporaryCode();
// const encoded = encodeTempCode(tempCode);
// codeToStorage(encoded);
//
// function codeFromParams(query, str) {
//   if (!query) return false;
//
//   const q = query.split("#")[0];
//   const arr = q.split("&");
//
//   let code = null;
//   arr.map(a => {
//     const param = a.split("=");
//     if (param[0] === str) {
//       code = param[1];
//       return code;
//     }
//   });
//   return code;
// }

setTimeout(close(), 10000);
