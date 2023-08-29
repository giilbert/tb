import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Application, getAllApplications, launchApplication } from "./api";
import { appWindow } from "@tauri-apps/api/window";
import { CommandItem } from "../../toolkit/components/command-item";

export const ApplicationsGroup: React.FC = () => {
  const [applications, setApplications] = useState<Application[] | null>(null);

  useEffect(() => {
    getAllApplications().then(setApplications).catch(console.error);
  }, []);

  return (
    <Command.Group title="Applications">
      <h2 className="text-muted-foreground ml-4 mb-2">Applications</h2>

      {!applications && (
        <Command.Loading>
          <span className="ml-4">Loading...</span>
        </Command.Loading>
      )}
      {applications && (
        <>
          {applications.map(
            (app, i) =>
              app.icon && (
                <CommandItem
                  key={i}
                  className="flex gap-4"
                  onSelect={() => {
                    if (app.command) {
                      launchApplication(app.command);
                      if (!import.meta.env.DEV) appWindow.close();
                    } else {
                      alert("TODO: error no command found");
                    }
                  }}
                >
                  <img src={app.icon} className="w-6 h-6" />
                  <span>{app.displayName}</span>
                  <span className="ml-auto text-muted-foreground">
                    Application
                  </span>
                </CommandItem>
              )
          )}
        </>
      )}
    </Command.Group>
  );
};
