import React, { useState, useRef, useEffect } from "react";
import { useConsole } from "../hooks/useConsole";
import "./ConsolePanel.css";

const TABS = [
  { key: "terminal", label: "TERMINAL" },
  { key: "problems", label: "PROBLEMS" },
  { key: "output", label: "OUTPUT" },
  { key: "debug", label: "DEBUG CONSOLE" },
];

const ConsolePanel = ({ fileStructure, onFileSelect }) => {
  const [activeTab, setActiveTab] = useState("terminal");
  const [terminalInput, setTerminalInput] = useState("");
  const inputRef = useRef(null);
  const consoleRef = useRef(null);

  const {
    history,
    executeCommand,
    clearConsole,
    getPreviousCommand,
    getNextCommand,
  } = useConsole(fileStructure, onFileSelect);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [history]);

  const handleInputChange = (e) => setTerminalInput(e.target.value);

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput);
      setTerminalInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setTerminalInput(getPreviousCommand());
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setTerminalInput(getNextCommand());
    }
  };

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    if (tabKey === "terminal") {
      // Focus input when switching to terminal tab
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const renderHistoryItem = (item, index) => {
    const className = `console-line ${item.type}`;
    return (
      <div key={index} className={className}>
        {item.content.map((line, lineIndex) => (
          <pre key={lineIndex}>{line}</pre>
        ))}
      </div>
    );
  };

  let content;
  if (activeTab === "terminal") {
    content = (
      <>
        <div className="console-content" ref={consoleRef}>
          {history.map(renderHistoryItem)}
        </div>
        <div className="console-input-bar">
          <span className="console-input-prompt">$</span>
          <input
            ref={inputRef}
            className="console-input"
            type="text"
            value={terminalInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command..."
            autoComplete="off"
            autoFocus
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
              onClick={() => handleTabClick(tab.key)}
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
