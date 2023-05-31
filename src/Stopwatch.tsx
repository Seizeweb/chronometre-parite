import React, { Fragment } from "react";

const Stopwatch = ({ display, time, count }) => {
  return (
    <Fragment>
      <h2>{display}</h2>
      <h3>Prises de parole: {count}</h3>
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
    </Fragment>
  );
};

export default Stopwatch;
