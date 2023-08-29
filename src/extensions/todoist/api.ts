import { Body, fetch } from "@tauri-apps/api/http";
import { getKeychainValue } from "../../toolkit/keychain";

const apiKey = getKeychainValue("todoist-api-key");

export interface Task {
  content: string;
  description?: string;
}

export const createTask = async (task: Task) => {
  const response = await fetch("https://api.todoist.com/rest/v2/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await apiKey}`,
      "Content-Type": "application/json",
    },
    body: Body.json(task),
  });

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to create task");
  }
};
