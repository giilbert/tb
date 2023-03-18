import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { appWindow } from "@tauri-apps/api/window";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

appWindow.show();
