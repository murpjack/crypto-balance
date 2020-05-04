import React from "react";
import { useTrackedState } from "../store";

import AccountItem from "./AccountItem";
import RateItem from "./RateItem";

export default function CryptosPage() {
  const state = useTrackedState();
  const { accounts, rates } = state;

  return (
    <div className="assets">
      <div>
        <h2 className="assets__header">Current rates</h2>
        <div className="assets__list">
          {rates.map((r, idx) => (
            <RateItem key={idx} rate={r} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="assets__header">Account</h2>
        <div className="assets__list">
          {accounts.map((a, idx) => (
            <AccountItem key={idx} account={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
