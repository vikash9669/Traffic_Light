import React, { useEffect, useState } from "react";
import TrafficLight from "./Pol";

export default function App() {
  const directions = ["North", "East", "South", "West"];
  const GREEN_DURATION = 5;
  const YELLOW_DURATION = 2;
  const CYCLE_TIME = (GREEN_DURATION + YELLOW_DURATION) * directions.length;

  const [globalTimer, setGlobalTimer] = useState(0); // seconds since start
  const [currentDirection, setCurrentDirection] = useState(0);
  const [phase, setPhase] = useState("green");

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalTimer((prev) => (prev + 1) % CYCLE_TIME);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const step = GREEN_DURATION + YELLOW_DURATION;
    const phasePosition = globalTimer % step;
    const activeDir = Math.floor(globalTimer / step) % directions.length;

    setCurrentDirection(activeDir);
    setPhase(phasePosition < GREEN_DURATION ? "green" : "yellow");
  }, [globalTimer]);

  const getLightPhase = (index) => {
    if (index === currentDirection) return phase;
    return "red";
  };

  const getTimerForDirection = (index) => {
    const step = GREEN_DURATION + YELLOW_DURATION;
    const activeDir = Math.floor(globalTimer / step) % directions.length;

    if (index === activeDir) {
      // Current green/yellow phase
      const remaining = step - (globalTimer % step);
      return remaining;
    } else {
      // Calculate time remaining until this direction becomes green
      const positionDiff =
        (index - activeDir + directions.length) % directions.length;
      const timeUntilGreen = positionDiff * step - (globalTimer % step);
      return timeUntilGreen <= 0 ? timeUntilGreen + CYCLE_TIME : timeUntilGreen;
    }
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#222",
    padding: "40px",
  };

  const poleWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      {directions.map((dir, idx) => (
        <div key={dir} style={poleWrapperStyle}>
          <TrafficLight
            activeLight={getLightPhase(idx)}
            timer={getTimerForDirection(idx)}
          />
          <span>{dir}</span>
        </div>
      ))}
    </div>
  );
}
