import React from "react";
import PropTypes from "prop-types";

export default function Asset({ asset }) {
  return (
    <div className="asset">
      <img
        src={`./images/32/color/${asset.imageName}.png`}
        className="asset__image"
        title={asset.name}
      />
      <div className="asset__code">{asset.code}</div>
      <div className="asset__numbers">
        <p className="asset__value">{"£" + asset.value}</p>
        {asset.amount && <p className="asset__amount">{asset.amount}</p>}
      </div>
    </div>
  );
}

Asset.propTypes = {
  asset: PropTypes.object.isRequired
};
