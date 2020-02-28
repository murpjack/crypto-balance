import React from "react";
import { useTracked, useTrackedState } from '../store';

import AccountItem from "./AccountItem";
import RateItem from "./RateItem";

export default function CryptosPage() {
  const [state, dispatch] = useTracked();
  const { accounts, rates } = state;
  console.log(3, state);

  return (
    <>
      <div className="header">
        <h1 className="header__title">Calypso</h1>
      </div>
      <div>
        <h2>Prices</h2>
        <div>
          {rates.map((r, idx) => <RateItem key={idx} rate={r} /> )}
        </div>
      </div>
      <div>
        <h2>Accounts</h2>
        <div>
          {accounts.map((a, idx) => <AccountItem key={idx} account={a} /> )}
        </div>
      </div>
    </>
  );
}
