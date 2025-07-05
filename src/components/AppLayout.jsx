import React, { useState } from "react";
import SplitPane from "react-split-pane";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EditorPanel from "./EditorPanel";
import ConsolePanel from "./ConsolePanel";
import "./AppLayout.css";

const AppLayout = ({
  files,
  openFiles,
  activeFile,
  fileContents,
  onFileSelect,
  onTabSelect,
  onTabClose,
  onEditorChange,
}) => {
  const [consoleHeight, setConsoleHeight] = useState(200);

  return (
    <div className="vscode-container">
      <Header />
      <div className="vscode-content">
        <SplitPane
          split="horizontal"
          minSize={40}
          defaultSize="75%"
          primary="first"
          size={consoleHeight}
          onChange={setConsoleHeight}
          className="vscode-root-split"
          allowResize
        >
          <div className="vscode-main">
            <div className="vscode-split">
              <Sidebar
                files={files}
                onFileSelect={onFileSelect}
                selectedFile={activeFile}
              />
              <EditorPanel
                openFiles={openFiles}
                activeFile={activeFile}
                fileContents={fileContents}
                onTabSelect={onTabSelect}
                onTabClose={onTabClose}
                onEditorChange={onEditorChange}
              />
            </div>
          </div>
          <ConsolePanel fileStructure={files} onFileSelect={onFileSelect} />
        </SplitPane>
      </div>
    </div>
  );
};

export default AppLayout;
