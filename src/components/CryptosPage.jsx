import React, { useContext } from "react";

import { CalypsoContext } from "../reducers/context";

// import AccountItem from "./AccountItem";
// import RateItem from "./RateItem";

export default function CryptosPage() {
  const { state } = useContext(CalypsoContext);
  // const { accounts, rates } = state;
  console.log(3, state);

  // if (state.accountData === null) return false;

  // const { rateData } = state;
  // console.log(rateData);

  return (
    <>
      <div className="header">
        <h1 className="header__title">Calypso</h1>
      </div>
      <div>
        <div>
          <h2>Prices</h2>
          Accounts
        </div>
      </div>
    </>
  );
}

// <ul>
//   {rateData.map((c, idx) => (
//     <RateItem key={idx} props={c} />
//   ))}
// </ul>
//        <div>
//   <h2>My Portfolio</h2>
//   <ul>
//     {accountData.map((c, idx) => (
//       <AccountItem key={idx} props={c} />
//     ))}
//   </ul>
// </div>
