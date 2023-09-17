import { Fragment, createRef, useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { Results } from "./components/results";
import { Command } from "cmdk";
import { Route, useLocation } from "wouter";
import type { Extension } from "./toolkit";
import { Actions, AppContext } from "./lib/context";
import { ActionBar } from "./components/action-bar";

export const App: React.FC<{
  extensions: Extension[];
}> = ({ extensions }) => {
  const [value, setValue] = useState<string>("");
  const inputRef = createRef<HTMLInputElement>();
  const [actions, setActions] = useState<Actions>({});
  const [page] = useLocation();

  useEffect(() => {
    if (page === "/") {
      setValue("");
    }

    inputRef.current?.focus();
  }, [page]);

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
    <AppContext.Provider value={{ extensions, actions, setActions }}>
      <Route path="/">
        <Command label="Search" className="grid grid-rows-[48px,auto] gap-2">
          <Command.Input
            value={value}
            onValueChange={setValue}
            className="w-full px-4 py-3 border-b bg-transparent text-lg outline-none rounded-md"
            placeholder="Search for something..."
            ref={inputRef}
          />
          <div className="h-[calc(100vh-88px)]">
            <Results query={value} />
          </div>
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

      <ActionBar />
    </AppContext.Provider>
  );
};
