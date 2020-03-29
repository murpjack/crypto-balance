export default function getImageName(abr) {
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
