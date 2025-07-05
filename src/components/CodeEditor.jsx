import React from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";

const CodeEditor = ({
  value = "",
  language = "javascript",
  onChange,
  height = "100%",
  theme = "vs-dark",
  options = {},
}) => {
  const defaultOptions = {
    minimap: { enabled: true },
    fontSize: 14,
    wordWrap: "on",
    automaticLayout: true,
    scrollBeyondLastLine: false,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    contextmenu: true,
    mouseWheelZoom: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    parameterHints: {
      enabled: true,
    },
    ...options,
  };

  return (
    <div className="editor-container">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        theme={theme}
        options={defaultOptions}
      />
    </div>
  );
};

export default CodeEditor;
