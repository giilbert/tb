import { Body, fetch } from "@tauri-apps/api/http";

export interface Task {
  content: string;
  description?: string;
}

export const createTask = async (task: Task) => {
  const response = await fetch("https://api.todoist.com/rest/v2/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer TODO: find a way to get an api token into here`,
      "Content-Type": "application/json",
    },
    body: Body.json(task),
  });

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to create task");
  }
};
