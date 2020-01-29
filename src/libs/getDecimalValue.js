export default function getDecimalValue(amount) {
  const roundUpValue = parseFloat(amount).toFixed(2);
  return roundUpValue;
}
