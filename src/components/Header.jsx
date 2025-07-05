import React from "react";
import "./Header.css";

const Header = ({ title = "CodeFlow Studio" }) => {
  return (
    <div className="vscode-header">
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
