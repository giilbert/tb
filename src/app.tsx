import { createRef, useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { Results } from "./components/results";
import { Command } from "cmdk";

export const App: React.FC = () => {
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
    <Command label="Search" className="grid grid-rows-[60px,auto]">
      <Command.Input
        value={value}
        onValueChange={setValue}
        className="w-full px-4 py-3 bg-muted text-2xl outline-none"
        ref={inputRef}
      />
      <Results query={value} />
    </Command>
  );
};
