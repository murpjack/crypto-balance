export function getImgName(abr) {
  switch (abr) {
    case "BTC":
      return "btc";
    case "ETC":
      return "etc";
    case "ETH":
      return "eth";
    case "LTC":
      return "ltc";
    case "XRP":
      return "xrp";
    case "DAI":
      return "dai";
    case "BCH":
      return "bch";
    case "XLM":
      return "xlm";
    default:
      return "crypto";
  }
}

export function getFullName(abr) {
  switch (abr) {
    case "BTC":
      return "Bitcoin";
    case "ETC":
      return "Etherium Classic";
    case "ETH":
      return "Etherium";
    case "LTC":
      return "Litecoin";
    case "XRP":
      return "Ripple";
    case "BCH":
      return "Bitcoin Cash";
    case "DAI":
      return "Dai";
    case "XLM":
      return "Stellar Lumens";
    default:
      return "Crypto";
  }
}

function getCurrencySymbol(curr) {
  switch (curr) {
    case "BTC":
      return "Ƀ";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "USD":
      return "$";
    default:
      return "£";
  }
}

export function getValue(data) {
  const currencySym = getCurrencySymbol(data.currency);
  const roundUpValue = parseFloat(data.amount).toFixed(2);
  return currencySym + roundUpValue;
}

export default {
  getImgName,
  getFullName,
  getValue
};
