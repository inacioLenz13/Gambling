import React from "react";
import ReactDOM from "react-dom/client";
import JokerThemeToggle from "./JokerThemeToggle";
import "./index.css";      // CSS global (opcional)
import "./CardAnimation.css"; // CSS do Joker

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JokerThemeToggle />
  </React.StrictMode>
);
