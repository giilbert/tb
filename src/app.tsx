import { createRef, useEffect } from "react";
import { appWindow } from "@tauri-apps/api/window";

export const App: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        className="w-full px-4 py-3 bg-neutral-700/20 text-2xl outline-none"
        ref={inputRef}
      />
      <div className="p-4">
        <h1 className="text-4xl font-semibold">Hello</h1>

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
