import { Fragment, createRef, useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { Results } from "./components/results";
import { Command } from "cmdk";
import { Route } from "wouter";
import type { Extension } from "./toolkit";
import { AppContext } from "./lib/context";

export const App: React.FC<{
  extensions: Extension[];
}> = ({ extensions }) => {
  const [value, setValue] = useState<string>("");
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    const windowOpenHandler = () => {
      inputRef.current?.focus();
      const root = document.getElementById("root");
      if (!root) return;
      root.classList.remove("opacity-0");
      root.classList.add("opacity-100");
      document.body.classList.add("bg-background/90");
      document.body.classList.remove("bg-background/0");
    };

    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        windowCloseHandler();
        if (!import.meta.env.DEV)
          setTimeout(() => {
            appWindow.hide();
          }, 100);
      }
    };

    const windowCloseHandler = () => {
      const root = document.getElementById("root");
      if (!root) return;
      root.classList.remove("opacity-100");
      root.classList.add("opacity-0");
      document.body.classList.remove("bg-background/90");
      document.body.classList.add("bg-background/0");
      setValue("");
    };

    windowOpenHandler();

    window.addEventListener("keydown", keyboardHandler);
    window.addEventListener("focus", windowOpenHandler);
    window.addEventListener("blur", windowCloseHandler);

    return () => {
      window.removeEventListener("keydown", keyboardHandler);
      window.removeEventListener("focus", windowOpenHandler);
      window.removeEventListener("blur", windowCloseHandler);
    };
  }, []);

  return (
    <AppContext.Provider value={{ extensions }}>
      <Route path="/">
        <Command label="Search" className="grid grid-rows-[60px,auto]">
          <Command.Input
            value={value}
            onValueChange={setValue}
            className="w-full px-4 py-3 bg-muted text-2xl outline-none"
            ref={inputRef}
          />
          <Results query={value} />
        </Command>
      </Route>

      {extensions.map(({ name, pages }) => (
        <Fragment key={name}>
          {pages?.map(({ path, component: Component }) => (
            <Route path={path} key={path}>
              <Component />
            </Route>
          ))}
        </Fragment>
      ))}
    </AppContext.Provider>
  );
};
