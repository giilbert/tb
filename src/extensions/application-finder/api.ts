import { invoke } from "@tauri-apps/api";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export interface Application {
  displayName: string;
  icon: string | null;
  command: string | null;
}

export const getAllApplications = async () => {
  const apps = await invoke<Application[]>("get_all_applications");
  return apps.map((app) => ({
    ...app,
    icon: app.icon ? convertFileSrc(app.icon) : null,
  }));
};

export const launchApplication = async (command: string) => {
  await invoke("launch_application", { command });
};
