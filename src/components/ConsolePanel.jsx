import React, { useState } from "react";
import "./ConsolePanel.css";

const TABS = [
  { key: "terminal", label: "TERMINAL" },
  { key: "problems", label: "PROBLEMS" },
  { key: "output", label: "OUTPUT" },
  { key: "debug", label: "DEBUG CONSOLE" },
];

const ConsolePanel = () => {
  const [activeTab, setActiveTab] = useState("terminal");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    "$ Console output will appear here...",
  ]);

  const handleInputChange = (e) => setTerminalInput(e.target.value);
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setTerminalHistory((prev) => [...prev, `$ ${terminalInput}`]);
      setTerminalInput("");
    }
  };

  let content;
  if (activeTab === "terminal") {
    content = (
      <>
        <div className="console-content">
          {terminalHistory.map((line, idx) => (
            <pre key={idx}>{line}</pre>
          ))}
        </div>
        <div className="console-input-bar">
          <span className="console-input-prompt">$</span>
          <input
            className="console-input"
            type="text"
            value={terminalInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command..."
            autoComplete="off"
          />
        </div>
      </>
    );
  } else if (activeTab === "problems") {
    content = (
      <div className="console-content problems-content">
        <span>No problems have been detected in the workspace so far.</span>
      </div>
    );
  } else if (activeTab === "output") {
    content = (
      <div className="console-content output-content">
        <span>Output will be shown here.</span>
      </div>
    );
  } else if (activeTab === "debug") {
    content = (
      <div className="console-content debug-content">
        <span>Debug output will be shown here.</span>
      </div>
    );
  }

  return (
    <div className="console-panel">
      <div className="console-header">
        <div className="console-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`console-tab${activeTab === tab.key ? " active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {content}
    </div>
  );
};

export default ConsolePanel;
