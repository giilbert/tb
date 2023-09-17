import { useEffect } from "react";
import { Modifiers, useActions } from "../lib/context";

export const ActionBar: React.FC = () => {
  const actions = useActions();

  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      for (const [key, options] of Object.entries(actions)) {
        console.log(e);
        if (
          e.key === key &&
          e.ctrlKey === options.modifiers.ctrl &&
          e.shiftKey === options.modifiers.shift &&
          e.altKey === options.modifiers.alt
        ) {
          options.callback();
        }
      }
    };

    window.addEventListener("keydown", keyboardHandler);

    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [actions]);

  return (
    <div className="h-8 w-screen border-t fixed left-0 bottom-0 flex justify-end px-2 p-1 items-center gap-2">
      {Object.entries(actions).map(([key, options]) => (
        <div className="flex gap-1" key={key}>
          <button
            className="h-full bg-muted px-2 rounded-md"
            onClick={() => options.callback()}
          >
            <KeyDisplay keyString={key} modifiers={options.modifiers} />
          </button>
          <p className="text-sm ml-1">{options.description}</p>
        </div>
      ))}
    </div>
  );
};

const KeyDisplay: React.FC<{ keyString: string; modifiers: Modifiers }> = ({
  keyString,
  modifiers,
}) => {
  return (
    <div className="flex gap-1 text-sm">
      {modifiers.shift && <span className="text-muted-foreground">Shift</span>}
      {modifiers.ctrl && <span className="text-muted-foreground">Ctrl</span>}
      {modifiers.alt && <span className="text-muted-foreground">Alt</span>}
      {keyString}
    </div>
  );
};
