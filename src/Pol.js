import React from "react";

export default function TrafficLight({ activeLight, timer }) {
  const containerStyle = {
    width: "120px",
    padding: "20px",
    backgroundColor: "#333",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  };

  const circleStyle = (color) => ({
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: color === activeLight ? color : "#555",
    boxShadow: color === activeLight ? `0 0 10px ${color}` : "none",
    transition: "background-color 0.5s, box-shadow 0.5s",
  });

  const timerStyle = {
    color: "#fff",
    fontSize: "20px",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={circleStyle("red")}></div>
      <div style={circleStyle("yellow")}></div>
      <div style={circleStyle("green")}></div>
      <div style={timerStyle}>{timer}s</div>
    </div>
  );
}
