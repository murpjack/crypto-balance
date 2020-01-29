import React from "react";
import PropTypes from "prop-types";
// TODO: getImageName in object not in component
// import { getImageName } from "../libs/getImageName";

export default function AccountItem({ code, name, amount, value }) {
  // value = rateData.value * accountData.amount
  return (
    <li id={code} className="rate">
      <img src={`./images/32/color/${code}.png`} className="rate__image" />
      <div className="rate__name name">
        <p className="name--full">{name}</p>
        <p className="name--short">{code}</p>
      </div>
      <div className={`crypto--${code}`}>
        <p className="rate__value value">{value}</p>
        <p className="rate__amount">{amount}</p>
      </div>
    </li>
  );
}

AccountItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
