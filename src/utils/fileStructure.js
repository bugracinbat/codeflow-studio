// Sample file structure data
export const fileStructure = [
  {
    name: "src",
    path: "src",
    type: "folder",
    children: [
      {
        name: "components",
        path: "src/components",
        type: "folder",
        children: [
          {
            name: "App.jsx",
            path: "src/components/App.jsx",
            type: "file",
            content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to CodeFlow Studio!</h1>
    </div>
  );
}

export default App;`,
          },
          {
            name: "Header.jsx",
            path: "src/components/Header.jsx",
            type: "file",
            content: `import React from 'react';

function Header() {
  return (
    <header className="app-header">
      <h1>CodeFlow Studio</h1>
      <p>Where code flows freely</p>
    </header>
  );
}

export default Header;`,
          },
        ],
      },
      {
        name: "App.jsx",
        path: "src/App.jsx",
        type: "file",
        content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to CodeFlow Studio!</h1>
      <p>Your creative coding playground</p>
    </div>
  );
}

export default App;`,
      },
      {
        name: "index.css",
        path: "src/index.css",
        type: "file",
        content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`,
      },
    ],
  },
  {
    name: "package.json",
    path: "package.json",
    type: "file",
    content: `{
  "name": "codeflow-studio",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "@monaco-editor/react": "^4.6.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`,
  },
  {
    name: "README.md",
    path: "README.md",
    type: "file",
    content: `# CodeFlow Studio

A modern online code editor built with React and Monaco Editor.

## Features

- File explorer with tree view
- Multiple editor tabs
- Syntax highlighting
- Real-time editing
- Resizable layout
- VS Code-like interface

## Getting Started

Run \`npm run dev\` to start the development server.

## Why CodeFlow Studio?

CodeFlow Studio represents the seamless flow of ideas into code, 
where creativity meets functionality in a beautiful coding environment.`,
  },
];

// Utility function to get language from file path
export const getLanguageFromPath = (path) => {
  const ext = path.split(".").pop();
  const languageMap = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
  };
  return languageMap[ext] || "plaintext";
};
