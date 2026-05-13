import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

// React starts from this file.
// It finds the <div id="root"></div> in index.html and puts the whole app inside it.
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode helps React warn about possible problems during development.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
