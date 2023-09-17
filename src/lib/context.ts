import { createContext, useContext } from "react";
import { Extension } from "../toolkit";

export interface Modifiers {
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
}

export type Actions = Record<
  string,
  {
    callback: () => void;
    modifiers: Modifiers;
    description: string;
  }
>;

export const AppContext = createContext<{
  extensions: Extension[];

  setActions: React.Dispatch<React.SetStateAction<Actions>>;
  actions: Actions;
} | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};

export const useExtensions = () => {
  const context = useAppContext();
  return context.extensions;
};

export const useActions = () => {
  const context = useAppContext();
  return context.actions;
};
