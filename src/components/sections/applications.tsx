import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { CommandItem } from "../cmdk-styled";
import {
  Application,
  getAllApplications,
  launchApplication,
} from "../../api/applications";
import { appWindow } from "@tauri-apps/api/window";

export const ApplicationsSection: React.FC = () => {
  const [applications, setApplications] = useState<Application[] | null>(null);

  useEffect(() => {
    getAllApplications().then(setApplications).catch(console.error);
  }, []);

  return (
    <Command.Group title="Applications">
      <h2 className="text-neutral-300 ml-4 mb-2">Applications</h2>

      {!applications && <Command.Loading>Loading</Command.Loading>}
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
                  {app.displayName}
                </CommandItem>
              )
          )}
        </>
      )}
    </Command.Group>
  );
};
