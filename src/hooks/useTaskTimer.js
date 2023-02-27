import { useContext } from "react";
import { TaskTimeContext } from "../context/taskTimer.context";

export function useTaskTimer() {
  return useContext(TaskTimeContext);
}
