import React from "react";
import SplitPane from "react-split-pane";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EditorPanel from "./EditorPanel";
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
  return (
    <div className="vscode-container">
      <Header />
      <div className="vscode-main">
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize={250}
          className="vscode-split"
        >
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
        </SplitPane>
      </div>
    </div>
  );
};

export default AppLayout;
