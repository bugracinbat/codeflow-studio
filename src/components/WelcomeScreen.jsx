import React from "react";
import "./WelcomeScreen.css";

const WelcomeScreen = ({
  title = "Welcome to CodeFlow Studio",
  message = "Select a file from the explorer to start coding!",
}) => {
  return (
    <div className="welcome-screen">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default WelcomeScreen;
