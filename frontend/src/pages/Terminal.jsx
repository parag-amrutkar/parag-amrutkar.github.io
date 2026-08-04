import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyses, products, profile, terminalCommands } from "../data/portfolio";
import "./Terminal.css";

const Terminal = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState("dark");
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    setHistory([{ type: "output", content: `Welcome to ${profile.name}'s portfolio terminal\n\nType 'help' to see available commands.\n` }]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  const addToHistory = (command, output) => {
    setHistory((previous) => [...previous, { type: "command", content: command }, { type: "output", content: output }]);
  };

  const processCommand = (rawCommand) => {
    const [command, ...args] = rawCommand.trim().toLowerCase().split(/\s+/);
    setCommandHistory((previous) => [...previous, rawCommand]);
    setHistoryIndex(-1);

    switch (command) {
      case "help":
        addToHistory(rawCommand, terminalCommands.help.output);
        break;
      case "about":
        addToHistory(rawCommand, `${profile.name}\n${profile.title}\n\n${profile.positioning}\n\nLocation: ${profile.location}`);
        break;
      case "work":
      case "projects": {
        const productLines = products.map((item) => `  [Product · ${item.status}] ${item.name}`);
        const analysisLines = analyses.map((item) => `  [Analysis · ${item.publishedAt}] ${item.title}`);
        addToHistory(rawCommand, `Work\n\nProducts\n${productLines.join("\n")}\n\nAnalysis\n${analysisLines.join("\n")}\n\nType 'gui' to explore full details.`);
        break;
      }
      case "contact":
        addToHistory(rawCommand, `Email: ${profile.email}\nLinkedIn: ${profile.linkedin}\nGitHub: ${profile.github}`);
        break;
      case "gui":
      case "website":
        addToHistory(rawCommand, "Switching to the website...");
        window.setTimeout(() => navigate("/"), 300);
        break;
      case "clear":
      case "cls":
        setHistory([]);
        break;
      case "theme": {
        const nextTheme = args[0];
        if (["dark", "light", "matrix"].includes(nextTheme)) {
          setTheme(nextTheme);
          addToHistory(rawCommand, `Theme changed to ${nextTheme}`);
        } else {
          addToHistory(rawCommand, `Current theme: ${theme}\nAvailable themes: dark, light, matrix`);
        }
        break;
      }
      default:
        addToHistory(rawCommand, `Command not found: ${command}\nType 'help' for available commands.`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentInput.trim()) {
      processCommand(currentInput);
      setCurrentInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" && commandHistory.length) {
      event.preventDefault();
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCurrentInput(commandHistory[nextIndex]);
    } else if (event.key === "ArrowDown" && historyIndex !== -1) {
      event.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setCurrentInput("");
      } else {
        setHistoryIndex(nextIndex);
        setCurrentInput(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <div className={`terminal-page theme-${theme}`}>
      <div className="terminal-header">
        <div className="terminal-title">
          <span className="terminal-dot dot-red" /><span className="terminal-dot dot-yellow" /><span className="terminal-dot dot-green" />
          <span className="terminal-name">terminal@portfolio</span>
        </div>
        <button className="terminal-close" onClick={() => navigate("/")} aria-label="Close terminal"><X size={20} /></button>
      </div>
      <div className="terminal-body" ref={terminalRef} onClick={() => inputRef.current?.focus()}>
        <div className="terminal-content">
          {history.map((entry, index) => (
            <div key={`${entry.type}-${index}`} className={`terminal-entry terminal-${entry.type}`}>
              {entry.type === "command" ? (
                <div className="terminal-command"><span className="terminal-prompt">visitor@portfolio:~$</span><span className="terminal-command-text">{entry.content}</span></div>
              ) : <pre className="terminal-output">{entry.content}</pre>}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="terminal-input-wrapper">
            <label className="terminal-prompt" htmlFor="terminal-input">visitor@portfolio:~$</label>
            <input id="terminal-input" ref={inputRef} value={currentInput} onChange={(event) => setCurrentInput(event.target.value)} onKeyDown={handleKeyDown} className="terminal-input" autoComplete="off" spellCheck="false" autoFocus />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
