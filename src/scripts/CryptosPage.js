import React from "react";
import AccountItem from "./scripts/AccountItem";
import RateItem from "./scripts/RateItem";

export default function CryptosPage() {
  return (
    <>
      <div className="header">
        <h1 className="header__title">Calypso</h1>
      </div>
      <div>
        <div>
          <h2>Prices</h2>
          <ul>
            {RateData.map((c, idx) => (
              <RateItem key={idx} props={c} />
            ))}
          </ul>
        </div>
        <div>
          <h2>My Portfolio</h2>
          <ul>
            {AccountData.map((c, idx) => (
              <AccountItem key={idx} props={c} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
