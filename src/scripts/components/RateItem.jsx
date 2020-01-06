import React from "react";
import PropTypes from "prop-types";
import { getImgName, getFullName } from "../helpers";

export default function RateItem({ code, value }) {
  return (
    <li id={code} className="rate">
      <img
        src={`./images/32/color/${getImgName(code)}.png`}
        className="rate__image"
      />
      <div className="rate__name name">
        <p className="name--full">{getFullName(code)}</p>
        <p className="name--short">{code}</p>
      </div>
      <div className={`crypto--${code}`}>
        <p className="rate__value value">{value}</p>
      </div>
    </li>
  );
}
RateItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
