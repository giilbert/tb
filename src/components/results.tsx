import { Command } from "cmdk";
import { ApplicationsSection } from "./sections/applications";

export const Results: React.FC<{ query: string }> = ({ query }) => {
  return (
    <Command.List className="flex flex-col gap-2 py-2 h-[calc(100vh-60px)] overflow-y-auto">
      <Command.Empty className="ml-4">No results found</Command.Empty>

      <ApplicationsSection />
    </Command.List>
  );
};
