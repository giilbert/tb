import { createContext, useContext } from "react";
import { Extension } from "../toolkit";

export const AppContext = createContext<{
  extensions: Extension[];
} | null>(null);

export const useExtensions = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useExtensions must be used within AppProvider");
  return context.extensions;
};
