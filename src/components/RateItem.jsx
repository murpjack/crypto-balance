import React from "react";
import PropTypes from "prop-types";
// TODO: getImageName in object not in component
import getFullName from "../libs/getFullName";
import getImageName from "../libs/getImageName";

export default function RateItem({ rate }) {
  const { code, value } = rate;
  return (
    <div id={code} className="rate">
      <img
        src={`./images/32/color/${getImageName(code)}.png`}
        className="rate__image"
      />
      <div className="rate__name name">
        <p className="name--full">{getFullName(code)}</p>
        <p className="name--short">{code}</p>
      </div>
      <div className={`crypto--${code}`}>
        <p className="rate__value value">{value}</p>
      </div>
    </div>
  );
}
RateItem.propTypes = {
  rate: PropTypes.object.isRequired
};
