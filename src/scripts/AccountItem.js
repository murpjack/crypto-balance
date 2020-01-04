import React from "react";
import PropTypes from "prop-types";
import { getImgName } from "./helpers";

export default function AccountItem({ code, name, amount, value }) {
  // value = rateData.value * accountData.amount
  return (
    <li>
      <img
        src={`./images/32/color/${getImgName(code)}.png`}
        className="rate__image"
      />
      <div>
        <p>{name}</p>
        <p>{code}</p>
      </div>
      <div className={`crypto--${code}`}>
        <p>{value}</p>
        <p>{amount}</p>
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
