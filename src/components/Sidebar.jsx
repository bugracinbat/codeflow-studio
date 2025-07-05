import React from "react";
import FileExplorer from "./FileExplorer";
import "./Sidebar.css";

const Sidebar = ({ files, onFileSelect, selectedFile }) => {
  return (
    <div className="sidebar">
      <FileExplorer
        files={files}
        onFileSelect={onFileSelect}
        selectedFile={selectedFile}
      />
    </div>
  );
};

export default Sidebar;
