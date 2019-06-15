import * as helperModule from "./my-helper-module.js"
import "./../css/style.css"
import "./../scss/style.scss"

import React from 'react';
import ReactDOM from 'react-dom';

console.log(helperModule.Greetings);

  // class RateItem extends React.Component {
  //   render() {
  //     return (
  //       <article id="btc" class="rate">
  //           <img src='./images/32/color/' + {this.props.base} + '.png' class="rate__image"/>
  //           <div class="rate__name name">
  //               <h1 class="name--full"><strong>{this.props.base}</strong></h1>
  //               <h2 class="name--short">{this.props.base}</h2>
  //           </div>
  //           <span class="rate__value value">{this.props.valueString}</span>
  //       </article>;
  //     );
  //   }}

  class RateItem extends React.Component {
    render() {
      return (
        <article id="btc" class="rate">
            <img src='./images/32/color/{this.props.base}.png' class="rate__image"/>
            <div class="rate__name name">
                <h1 class="name--full"><strong>{this.props.base}</strong></h1>
                <h2 class="name--short">{this.props.base}</h2>
            </div>
            <span class="rate__value value">{this.props.valueString}</span>
        </article>
      );
    }}


      const title = 'Moo';

        ReactDOM.render(
          <RateItem base={"btc"} valueString={"$34.34"}/>,
          document.getElementById('app')
        );

  //
  // const title = 'Moo';
  //
  //   ReactDOM.render(
  //     <div>{title}</div>,
  //     document.getElementById('app')
  //   );
