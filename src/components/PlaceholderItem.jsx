import React from "react";
import PropTypes from "prop-types";

export default function PlaceholderItem({ rate }) {
  const { code, name, imageName } = rate;

  return (
    <div id={code} className="rate">
      <img
        src={`./images/32/color/${imageName}.png`}
        className="rate__image"
        title={name}
      />
      <div className="rate__code"></div>
      <p className="rate__value"></p>
    </div>
  );
}

PlaceholderItem.propTypes = {
  rate: PropTypes.object.isRequired
};
