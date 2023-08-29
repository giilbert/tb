import { Command } from "cmdk";
import { ApplicationsSection } from "./sections/applications";
import { TodoistSection } from "./sections/todoist";

export const Results: React.FC<{ query: string }> = ({ query }) => {
  return (
    <Command.List className="py-2 h-[calc(100vh-60px)] overflow-y-auto">
      <Command.Empty className="ml-4">No results found</Command.Empty>

      <TodoistSection />
      <hr className="m-4" />
      <ApplicationsSection />
    </Command.List>
  );
};
