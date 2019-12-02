import { getImgName, getFullName } from "./helpers";
import React from "react";
import PropTypes from "prop-types";

const RateItem = props => {
  return (
    <article id={props.base} className="rate">
      <img
        src={"./images/32/color/" + getImgName(props.base) + ".png"}
        className="rate__image"
      />
      <div className="rate__name name">
        <h1 className="name--full">
          {" "}
          <strong> {getFullName(props.base)} </strong>{" "}
        </h1>
        <h2 className="name--short"> {props.base} </h2>
      </div>
      <span className="rate__value value"> {props.value} </span>
    </article>
  );
};

RateItem.propTypes = {
  base: PropTypes.string,
  value: PropTypes.string
};

export default RateItem;
