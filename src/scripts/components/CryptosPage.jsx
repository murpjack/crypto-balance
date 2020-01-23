import React, { useContext } from "react";
// import AccountItem from "./AccountItem";
// import RateItem from "./RateItem";
import { CalypsoContext } from "./../context";

export default function CryptosPage() {
  const { state } = useContext(CalypsoContext);
  console.log(state);
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
