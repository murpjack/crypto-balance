export default function getFullName(abr) {
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
