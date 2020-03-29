import React from "react";
import PropTypes from "prop-types";
// TODO: getImageName in object not in component
import getImageName from "../libs/getImageName";
import { useTrackedState } from "../store";

export default function AccountItem({ account }) {
  const { code, name, amount, value } = account;
  const state = useTrackedState();
  const { currencySymbol } = state;

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
      <div className={`asset__numbers crypto--${code}`}>
        <p className="asset__value value">{currencySymbol + value}</p>
        <p className="rate__amount">{amount}</p>
      </div>
    </div>
  );
}

AccountItem.propTypes = {
  account: PropTypes.object.isRequired
};
