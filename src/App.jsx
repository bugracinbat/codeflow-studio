import React from "react";
import AppLayout from "./components/AppLayout";
import { useFileManager } from "./hooks/useFileManager";
import { fileStructure } from "./utils/fileStructure";
import "./App.css";

function App() {
  const {
    openFiles,
    activeFile,
    fileContents,
    handleFileSelect,
    handleTabSelect,
    handleTabClose,
    handleEditorChange,
  } = useFileManager();

  return (
    <AppLayout
      files={fileStructure}
      openFiles={openFiles}
      activeFile={activeFile}
      fileContents={fileContents}
      onFileSelect={handleFileSelect}
      onTabSelect={handleTabSelect}
      onTabClose={handleTabClose}
      onEditorChange={handleEditorChange}
    />
  );
}

export default App;
