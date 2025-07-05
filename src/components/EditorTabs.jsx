import React from "react";
import { FaTimes } from "react-icons/fa";
import "./EditorTabs.css";

const EditorTabs = ({ openFiles, activeFile, onTabSelect, onTabClose }) => {
  return (
    <div className="editor-tabs">
      {openFiles.map((file) => (
        <div
          key={file.path}
          className={`tab ${activeFile === file.path ? "active" : ""}`}
          onClick={() => onTabSelect(file.path)}
        >
          <span className="tab-name">{file.name}</span>
          <button
            className="tab-close"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(file.path);
            }}
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;
