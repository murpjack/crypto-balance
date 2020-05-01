import React from "react";
import PropTypes from "prop-types";

export default function AccountItem({ account }) {
  const { code, name, amount, value, imageName } = account;

  return (
    <div id={code} className="rate">
      <img
        src={`./images/32/color/${imageName}.png`}
        className="rate__image"
        title={name}
      />
      <div className="rate__code">{code}</div>
      <div className="asset__numbers">
        <p className="asset__value">{"£" + value}</p>
        <p className="rate__amount">{amount}</p>
      </div>
    </div>
  );
}

AccountItem.propTypes = {
  account: PropTypes.object.isRequired
};
