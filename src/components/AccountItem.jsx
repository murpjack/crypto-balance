import React from "react";
import PropTypes from "prop-types";
// TODO: getImageName in object not in component
import getImageName from "../libs/getImageName";

export default function AccountItem({ account }) {
  const { code, name, amount, value } = account;
  return (
    <div id={code} className="rate">
      <img
        src={`./images/32/color/${getImageName(code)}.png`}
        className="rate__image"
      />
      <div className="rate__name name">
        <p className="name--full">{name}</p>
        <p className="name--short">{code}</p>
      </div>
      <div className={`crypto--${code}`}>
        <p className="rate__value value">{value}</p>
        <p className="rate__amount">{amount}</p>
      </div>
    </div>
  );
}

AccountItem.propTypes = {
  account: PropTypes.object.isRequired
};
