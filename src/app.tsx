import { createRef, useEffect, useRef } from "react";
import { appWindow } from "@tauri-apps/api/window";

export const App: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    const windowOpenHandler = () => {
      inputRef.current?.focus();
    };

    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        windowCloseHandler();
        appWindow.hide();
      }
    };

    const windowCloseHandler = () => {
      if (inputRef.current) inputRef.current.value = "";
    };

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
    <>
      <input
        className="w-full px-4 py-3 bg-neutral-700/20 text-2xl outline-none"
        ref={inputRef}
      />
      <div className="p-4">
        <h1 className="text-4xl font-semibold">asdasdsdasdasd</h1>

        <button
          onClick={() => {
            appWindow.hide();
          }}
        >
          Hide
        </button>
      </div>
    </>
  );
};
