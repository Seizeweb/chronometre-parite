import { Fragment, useEffect, useState } from "react";
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

  useEffect(() => {
    let interval;
    if (runningGender) {
      interval = setInterval(() => {
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
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [runningGender]);

  return (
    <div className="App">
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
  );
}

export default App;
