import { useContext, useEffect } from "react";
import { AppContext, Modifiers } from "../../lib/context";

interface UseKeyboardActionOptions {
  key: string;
  description: string;
  modifiers?: Partial<Modifiers>;
  callback: () => void;
}

export const useKeyboardAction = (options: UseKeyboardActionOptions) => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useKeyboardAction must be used within AppProvider");

  useEffect(() => {
    context.setActions((actions) => ({
      ...actions,
      [options.key]: {
        callback: options.callback,
        description: options.description,
        modifiers: {
          ctrl: false,
          shift: false,
          alt: false,
          ...options.modifiers,
        },
      },
    }));

    return () => {
      context.setActions((actions) => {
        const { [options.key]: _, ...rest } = actions;
        return rest;
      });
    };
  }, []);
};
