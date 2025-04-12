import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { TimerProps } from "../types/interfaces"

const Timer: React.FC<TimerProps> = ({ initialTime, start, onTimeUp, onTimeUpdate }) => {  // define Timer component as a function
  const [time, setTime] = useState<number>(initialTime); // set state variable to initialTime in each challenge

  useEffect(() => { // useEffect hook used to run the function 'on the side' https://legacy.reactjs.org/docs/hooks-effect.html
    if (!start) { // wait until 'start' is true
      setTime(initialTime); // reset timer when a new challenge starts
      return;
    }

    if (time > 0) {
      setTimeout(() => {  // "asynchronous function" - https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
        setTime(time - 1);
        onTimeUpdate(time - 1); // for tracking points
      }, 1000);
    } else {
      onTimeUp(); // call function when timer reaches 0
    }
  }, [initialTime, time, start, onTimeUpdate, onTimeUp]); // useEffect dependencies

  // display time remaining in challenge
  return <Typography color="red">Time Left: {time}s</Typography>;
};

export default Timer;
