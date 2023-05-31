import { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import Stopwatch from "./Stopwatch.tsx";
import React from "react";

function App() {
  // const [time, setTime] = useState(0);

  const [runningGender, setRunningGender] = useState();

  const startGender = (genderId) => {
    setRunningGender(genderId);
  };

  const [genders, setGenders] = useState([
    { id: "m", display: "Homme", time: 0 },
    { id: "f", display: "Femme", time: 0 },
    { id: "nb", display: "Non-Binaire", time: 0 },
  ]);

  const intervalRef = useRef(0);

  useEffect(() => {
    if (runningGender) {
      intervalRef.current = setInterval(() => {
        setGenders((prevState) => {
          const index = prevState.findIndex(
            (gender) => gender.id === runningGender
          );
          const newState = [...prevState];
          newState[index].time = prevState[index].time + 10;
          return newState;
        });
      }, 10);
    } else if (!runningGender) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [runningGender]);

  const stopCounter = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className="App">
      <Fragment>
        <div className="counters">
          {genders.map((gender) => (
            <Fragment key={gender.id}>
              <Stopwatch
                display={gender.display}
                key={gender.id}
                time={gender.time}
                running={runningGender === gender.id}
              />
              <button onClick={() => startGender(gender.id)}>
                Start {gender.display}
              </button>
            </Fragment>
          ))}
        </div>
        <button id="stop" onClick={stopCounter}>
          Pause
        </button>
      </Fragment>
    </div>
  );
}

export default App;
