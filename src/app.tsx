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
    };

    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        windowCloseHandler();
        if (!import.meta.env.DEV) appWindow.hide();
      }
    };

    const windowCloseHandler = () => {
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
        <Command
          label="Search"
          className="grid grid-rows-[48px,auto,16px] mx-2 mt-2 gap-2"
        >
          <Command.Input
            value={value}
            onValueChange={setValue}
            className="w-full px-3 py-2 bg-muted text-lg outline-none rounded-md"
            ref={inputRef}
          />
          <div className="h-[calc(100vh-112px)]">
            <Results query={value} />
          </div>
          <div className="h-8 w-full bg-slate-900"></div>
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
