import React, { useContext } from "react";
import AccountItem from "./AccountItem";
import RateItem from "./RateItem";
import { CalypsoContext } from "./../context";

export default function CryptosPage() {
  const { state } = useContext(CalypsoContext);
  const { rateData, accountData } = state;
  return (
    <>
      <div className="header">
        <h1 className="header__title">Calypso</h1>
      </div>
      <div>
        <div>
          <h2>Prices</h2>
          <ul>
            {rateData.map((c, idx) => (
              <RateItem key={idx} props={c} />
            ))}
          </ul>
        </div>
        <div>
          <h2>My Portfolio</h2>
          <ul>
            {accountData.map((c, idx) => (
              <AccountItem key={idx} props={c} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
