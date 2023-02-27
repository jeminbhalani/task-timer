import "./App.css";
import Timer from "./components/Timer";
import { TaskTimeProvider } from "./context/taskTimer.context";

function App() {
  return (
    <div className="App">
      <TaskTimeProvider>
        <Timer />
      </TaskTimeProvider>
    </div>
  );
}

export default App;
