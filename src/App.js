import { Fragment, useEffect, useRef, useState } from "react";
import "./App.scss";
import Stopwatch from "./Stopwatch.tsx";
import React from "react";

function App() {
  const [totalTime, setTotalTime] = useState(0);

  const [runningGender, setRunningGender] = useState();
  const [sure, setSure] = useState(false);

  const startGender = async (genderId) => {
    setSure(false);
    if (runningGender !== genderId) setRunningGender(genderId);
  };

  const [genders, setGenders] = useState([
    { id: "m", display: "Homme", time: 0, count: 0 },
    { id: "f", display: "Femme", time: 0, count: 0 },
    { id: "nb", display: "Non-Binaire", time: 0, count: 0 },
  ]);

  const intervalRef = useRef(0);

  useEffect(() => {
    let isFirstIteration = true;
    if (runningGender) {
      intervalRef.current = setInterval(() => {
        setGenders((prevState) => {
          const index = prevState.findIndex(
            (gender) => gender.id === runningGender
          );
          const newState = [...prevState];
          if (isFirstIteration) {
            newState[index].count++;
            isFirstIteration = false;
          }
          newState[index].time = prevState[index].time + 10;
          return newState;
        });
        setTotalTime((prevTotalTime) => prevTotalTime + 10);
      }, 10);
    } else if (!runningGender) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [runningGender]);

  const stopCounters = () => {
    setRunningGender(null);
    clearInterval(intervalRef.current);
  };

  const resetCounters = () => {
    setRunningGender(null);
    clearInterval(intervalRef.current);
    if (sure) {
      setTotalTime(0);
      setGenders((prevState) => {
        const newState = [...prevState];
        for (let el of newState) {
          el.time = 0;
          el.count = 0;
        }
        return newState;
      });
      setSure((prevSure) => !prevSure);
    } else {
      setSure((prevSure) => !prevSure);
    }
  };

  return (
    <div className="App">
      <Fragment>
        <h1 id="totalCount">
          <span>Temps de parole total : </span>
          <span>{("0" + Math.floor((totalTime / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((totalTime / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((totalTime / 10) % 100)).slice(-2)}</span>
        </h1>
        <div className="counters">
          {genders.map((gender) => (
            <div className="counter" key={gender.id}>
              <Stopwatch
                display={gender.display}
                key={gender.id}
                time={gender.time}
                count={gender.count}
                running={runningGender === gender.id}
              />
              <button onClick={() => startGender(gender.id)} className="btn">
                Start {gender.display}
              </button>
            </div>
          ))}
        </div>
        <div className="general-controls">
          <button id="stop" onClick={stopCounters} className="btn">
            Pause
          </button>
          <button id="reset" onClick={resetCounters} className="btn">
            {!sure ? "Réinitialiser" : "Êtes-vous sûr ?"}
          </button>
        </div>
      </Fragment>
    </div>
  );
}

export default App;
