import React from "react";
import EditorTabs from "./EditorTabs";
import CodeEditor from "./CodeEditor";
import WelcomeScreen from "./WelcomeScreen";
import { getLanguageFromPath } from "../utils/fileStructure";
import "./EditorPanel.css";

const EditorPanel = ({
  openFiles,
  activeFile,
  fileContents,
  onTabSelect,
  onTabClose,
  onEditorChange,
}) => {
  return (
    <div className="editor-panel">
      {openFiles.length > 0 ? (
        <>
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            onTabSelect={onTabSelect}
            onTabClose={onTabClose}
          />
          <CodeEditor
            value={fileContents[activeFile] || ""}
            language={getLanguageFromPath(activeFile)}
            onChange={onEditorChange}
          />
        </>
      ) : (
        <WelcomeScreen />
      )}
    </div>
  );
};

export default EditorPanel;
