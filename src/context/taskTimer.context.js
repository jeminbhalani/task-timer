import { createContext, useState } from "react";

export const TaskTimeContext = createContext(undefined);

export const TaskTimeProvider = ({ children }) => {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [currTaskTime, setCurrTaskTime] = useState(0);
  const [timePerTask, setTimePerTask] = useState();

  const value = {
    time,
    setTime,
    isOn,
    setIsOn,
    timePerTask,
    setTimePerTask,
    currTaskTime,
    setCurrTaskTime,
  };
  return (
    <TaskTimeContext.Provider value={value}>
      {children}
    </TaskTimeContext.Provider>
  );
};
