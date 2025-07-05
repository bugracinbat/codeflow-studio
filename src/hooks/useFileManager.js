import { useState } from "react";

export const useFileManager = () => {
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContents, setFileContents] = useState({});

  const handleFileSelect = (file) => {
    if (file.type === "file") {
      // Add file to open files if not already open
      if (!openFiles.find((f) => f.path === file.path)) {
        setOpenFiles([...openFiles, file]);
        setFileContents((prev) => ({
          ...prev,
          [file.path]: file.content || "",
        }));
      }
      setActiveFile(file.path);
    }
  };

  const handleTabSelect = (filePath) => {
    setActiveFile(filePath);
  };

  const handleTabClose = (filePath) => {
    const newOpenFiles = openFiles.filter((f) => f.path !== filePath);
    setOpenFiles(newOpenFiles);

    if (activeFile === filePath) {
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[0].path : null);
    }
  };

  const handleEditorChange = (value) => {
    if (activeFile) {
      setFileContents((prev) => ({
        ...prev,
        [activeFile]: value,
      }));
    }
  };

  return {
    openFiles,
    activeFile,
    fileContents,
    handleFileSelect,
    handleTabSelect,
    handleTabClose,
    handleEditorChange,
  };
};
