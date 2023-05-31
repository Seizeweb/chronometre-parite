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
      <div className="buttons">
        {/* <button onClick={() => setRunning(true)}>Start</button> */}
        {/* <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button> */}
      </div>
    </Fragment>
  );
};

export default Stopwatch;
