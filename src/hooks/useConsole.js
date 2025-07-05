import { useState, useCallback } from "react";

// Predefined commands that can be executed
const COMMANDS = {
  help: {
    description: "Show available commands",
    execute: () => [
      "Available commands:",
      "  help                    - Show this help message",
      "  clear                   - Clear console output",
      "  ls [path]              - List files and directories",
      "  cat <file>             - Show file contents",
      "  echo <text>            - Print text",
      "  date                   - Show current date and time",
      "  pwd                    - Show current working directory",
      "  js <code>              - Execute JavaScript code",
      "  files                  - List all files in the workspace",
      "  open <file>            - Open a file in the editor",
      "  preview                - Start development server",
      "  build                  - Build the project",
      "",
    ],
  },
  clear: {
    description: "Clear console output",
    execute: () => [],
  },
  ls: {
    description: "List files and directories",
    execute: (args, fileStructure) => {
      const path = args[0] || ".";
      const files = getFilesAtPath(fileStructure, path);
      if (files) {
        return files.map(
          (file) => `${file.type === "folder" ? "📁" : "📄"} ${file.name}`
        );
      }
      return [`Directory not found: ${path}`];
    },
  },
  cat: {
    description: "Show file contents",
    execute: (args, fileStructure) => {
      const filePath = args[0];
      if (!filePath) {
        return ["Usage: cat <file>"];
      }
      const file = findFile(fileStructure, filePath);
      if (file && file.type === "file") {
        return file.content ? file.content.split("\n") : ["(empty file)"];
      }
      return [`File not found: ${filePath}`];
    },
  },
  echo: {
    description: "Print text",
    execute: (args) => [args.join(" ")],
  },
  date: {
    description: "Show current date and time",
    execute: () => [new Date().toString()],
  },
  pwd: {
    description: "Show current working directory",
    execute: () => ["/workspace"],
  },
  js: {
    description: "Execute JavaScript code",
    execute: (args) => {
      try {
        const code = args.join(" ");
        const result = eval(code);
        return [`> ${code}`, `= ${result}`];
      } catch (error) {
        return [`Error: ${error.message}`];
      }
    },
  },
  files: {
    description: "List all files in the workspace",
    execute: (args, fileStructure) => {
      const allFiles = getAllFiles(fileStructure);
      return allFiles.map((file) => file.path);
    },
  },
  open: {
    description: "Open a file in the editor",
    execute: (args, fileStructure, onFileSelect) => {
      const filePath = args[0];
      if (!filePath) {
        return ["Usage: open <file>"];
      }
      const file = findFile(fileStructure, filePath);
      if (file && file.type === "file") {
        onFileSelect(file);
        return [`Opened: ${filePath}`];
      }
      return [`File not found: ${filePath}`];
    },
  },
  preview: {
    description: "Start development server",
    execute: () => [
      "🚀 Starting development server...",
      "",
      "To preview your CodeFlow Studio app:",
      "1. Open your terminal/command prompt",
      "2. Navigate to your project directory",
      "3. Run: npm run dev",
      "4. Open your browser to the URL shown (usually http://localhost:5173)",
      "",
      "Or use the integrated preview:",
      "- Press Ctrl+Shift+P (Cmd+Shift+P on Mac)",
      "- Type 'Preview' and select 'Preview in Browser'",
      "",
      "Your app should now be running with:",
      "✅ File explorer with tree view",
      "✅ Multiple editor tabs",
      "✅ Monaco editor with syntax highlighting",
      "✅ Resizable layout",
      "✅ Functional console with commands",
      "✅ VSCode-like interface",
    ],
  },
  build: {
    description: "Build the project for production",
    execute: () => [
      "🏗️  Building project for production...",
      "",
      "To build your project:",
      "1. Open your terminal/command prompt",
      "2. Navigate to your project directory",
      "3. Run: npm run build",
      "4. The built files will be in the 'dist' folder",
      "",
      "To preview the production build:",
      "1. Run: npm run preview",
      "2. Open your browser to the URL shown",
    ],
  },
};

// Helper functions
const getFilesAtPath = (fileStructure, path) => {
  if (path === "." || path === "/") {
    return fileStructure;
  }
  // Simple path traversal - could be enhanced
  const parts = path.split("/").filter(Boolean);
  let current = fileStructure;
  for (const part of parts) {
    const found = current.find((item) => item.name === part);
    if (!found || found.type !== "folder") {
      return null;
    }
    current = found.children || [];
  }
  return current;
};

const findFile = (fileStructure, filePath) => {
  const search = (items) => {
    for (const item of items) {
      if (item.path === filePath) {
        return item;
      }
      if (item.type === "folder" && item.children) {
        const found = search(item.children);
        if (found) return found;
      }
    }
    return null;
  };
  return search(fileStructure);
};

const getAllFiles = (fileStructure) => {
  const files = [];
  const traverse = (items) => {
    for (const item of items) {
      if (item.type === "file") {
        files.push(item);
      }
      if (item.type === "folder" && item.children) {
        traverse(item.children);
      }
    }
  };
  traverse(fileStructure);
  return files;
};

export const useConsole = (fileStructure, onFileSelect) => {
  const [history, setHistory] = useState([
    {
      type: "output",
      content: [
        "Welcome to CodeFlow Studio Console!",
        "Type 'help' for available commands.",
      ],
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const executeCommand = useCallback(
    (commandLine) => {
      const trimmed = commandLine.trim();
      if (!trimmed) return;

      // Add command to history
      setHistory((prev) => [
        ...prev,
        { type: "input", content: [`$ ${trimmed}`] },
      ]);
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      // Parse command
      const parts = trimmed.split(" ");
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      // Execute command
      if (COMMANDS[command]) {
        try {
          const output = COMMANDS[command].execute(
            args,
            fileStructure,
            onFileSelect
          );
          setHistory((prev) => [...prev, { type: "output", content: output }]);
        } catch (error) {
          setHistory((prev) => [
            ...prev,
            { type: "error", content: [`Error: ${error.message}`] },
          ]);
        }
      } else {
        setHistory((prev) => [
          ...prev,
          {
            type: "error",
            content: [
              `Command not found: ${command}. Type 'help' for available commands.`,
            ],
          },
        ]);
      }
    },
    [fileStructure, onFileSelect]
  );

  const clearConsole = useCallback(() => {
    setHistory([]);
  }, []);

  const getPreviousCommand = useCallback(() => {
    if (commandHistory.length === 0) return "";
    const newIndex = Math.max(-1, historyIndex - 1);
    setHistoryIndex(newIndex);
    return newIndex >= 0
      ? commandHistory[commandHistory.length - 1 - newIndex]
      : "";
  }, [commandHistory, historyIndex]);

  const getNextCommand = useCallback(() => {
    if (commandHistory.length === 0) return "";
    const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
    setHistoryIndex(newIndex);
    return newIndex >= 0
      ? commandHistory[commandHistory.length - 1 - newIndex]
      : "";
  }, [commandHistory, historyIndex]);

  return {
    history,
    executeCommand,
    clearConsole,
    getPreviousCommand,
    getNextCommand,
  };
};
