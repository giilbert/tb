import { CreateExtension } from "../../toolkit/extension";
import { CreateTaskPage } from "./pages/create-task";
import { TodoistGroup } from "./group";

export const todoist: CreateExtension = () => ({
  name: "Todoist",
  group: TodoistGroup,
  pages: [
    {
      path: "/todoist/create-task",
      component: CreateTaskPage,
    },
  ],
});
