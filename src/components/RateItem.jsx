import React from "react";
import PropTypes from "prop-types";
import getFullName from "../libs/getFullName";

export default function RateItem({ rate }) {
  const { code, value, imageName } = rate;

  return (
    <div id={code} className="rate">
      <img src={`./images/32/color/${imageName}.png`} className="rate__image" />
      <div className="rate__name name">
        <p className="name--full">{getFullName(code)}</p>
        <p className="name--short">{code}</p>
      </div>
      <div className={`crypto--${code}`}>
        <p className="rate__value value">{"£" + value}</p>
      </div>
    </div>
  );
}

RateItem.propTypes = {
  rate: PropTypes.object.isRequired
};
