import { getFullName, getImgName, getRateValue } from "./details.js";
import RATES from "./variables.js";

import React from "react";
import PropTypes from "prop-types";

import Future from "fluture/index.js";

export const RateItem = props => {
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
        </h1>{" "}
        <h2 className="name--short"> {props.base} </h2>{" "}
      </div>{" "}
      <span className="rate__value value"> {props.value} </span>{" "}
    </article>
  );
};

RateItem.propTypes = {
  base: PropTypes.string,
  value: PropTypes.string
};

export const WarningItem = props => {
  return <article className="rate__message"> {props.value} </article>;
};

WarningItem.propTypes = {
  value: PropTypes.string
};

export default class AllTheRateItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = RATES.map(r => ({
      [r]: {
        status: "NotAsked",
        content: "Loading Cryptos"
      }
    })).reduce((acc, v) => Object.assign(acc, v), {});
  }

  componentDidMount() {
    const futureList = RATES.map(r => this.fetchData(r));

    Future.parallel(RATES.length, futureList).value(x => x);
  }

  // populate state with fetched data
  fetchData(rate) {
    this.setState({
      [rate]: {
        status: "Loading",
        content: "Loading Cryptos"
      }
    });

    const createObjct = res => {
      if (res.errors) {
        return {
          [rate]: {
            status: "Failure",
            error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
          }
        };
      } else {
        return {
          [rate]: {
            status: "Success",
            content: getRateValue(res.data)
          }
        };
      }
    };

    const fetchF = Future.encaseP(fetch);

    const spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;

    const responseJSON = fetchF(spotUrl).chain(res =>
      Future.tryP(_ => res.json())
    );

    const newObject = responseJSON.map(createObjct);

    const updateState = newObject.value(obj => this.setState(obj));

    return Future.of(updateState);
  }

  render() {
    const cryptos = Object.keys(this.state);
    const cryptoStatuses = cryptos.map(crypto => {
      return {
        base: crypto,
        value: this.state[crypto]
      };
    });

    return cryptoStatuses.map((item, index) => {
      switch (item.value.status) {
        case "NotAsked":
        case "Loading":
          if (index === 0) {
            return <WarningItem key={index} value={item.value.content} />;
          }
          break;
        case "Failure":
          return;
        case "Success":
          return (
            <RateItem key={index} base={item.base} value={item.value.content} />
          );
        default:
          if (index === 0) {
            return (
              <RateItem
                key={index}
                base={item.base}
                value={"Oops, that was unexpected..."}
              />
            );
          }
          break;
      }
    });
  }
}
