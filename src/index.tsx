import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { appWindow } from "@tauri-apps/api/window";
import { applicationFinder } from "./extensions/application-finder";
import { todoist } from "./extensions/todoist";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App extensions={[todoist(), applicationFinder()]} />
  </React.StrictMode>
);

appWindow.show();
