import React from "react";
import PropTypes from "prop-types";

export default function RateItem({ rate }) {
  const { code, name, value, imageName } = rate;

  return (
    <div id={code} className="rate">
      <img
        src={`./images/32/color/${imageName}.png`}
        className="rate__image"
        title={name}
      />
      <div className="rate__code">{code}</div>
      <p className="rate__value">{"£" + value}</p>
    </div>
  );
}

RateItem.propTypes = {
  rate: PropTypes.object.isRequired
};
