import React, { useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import "./FileExplorer.css";

const FileExplorer = ({ files, onFileSelect, selectedFile }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  const toggleFolder = (folderPath) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (fileList, level = 0) => {
    return fileList.map((item) => {
      const isExpanded = expandedFolders.has(item.path);
      const isSelected = selectedFile === item.path;

      if (item.type === "folder") {
        return (
          <div key={item.path}>
            <div
              className={`file-item folder ${isSelected ? "selected" : ""}`}
              style={{ paddingLeft: `${level * 20}px` }}
              onClick={() => toggleFolder(item.path)}
            >
              <span className="chevron">
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
              <span className="icon">
                {isExpanded ? <FaFolderOpen /> : <FaFolder />}
              </span>
              <span className="name">{item.name}</span>
            </div>
            {isExpanded && item.children && (
              <div className="folder-contents">
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={item.path}
            className={`file-item file ${isSelected ? "selected" : ""}`}
            style={{ paddingLeft: `${level * 20}px` }}
            onClick={() => onFileSelect(item)}
          >
            <span className="icon">
              <FaFile />
            </span>
            <span className="name">{item.name}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <h3>EXPLORER</h3>
      </div>
      <div className="file-tree">{renderFileTree(files)}</div>
    </div>
  );
};

export default FileExplorer;
