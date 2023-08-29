import { Command } from "cmdk";
import { CommandItem } from "../cmdk-styled";
import { PlusSquareIcon } from "lucide-react";
import { useLocation } from "wouter";

export const TodoistSection: React.FC = () => {
  const [, navigate] = useLocation();

  return (
    <Command.Group>
      <h2 className="text-muted-foreground ml-4 mb-2">Todoist</h2>

      <CommandItem
        className="flex gap-4"
        onSelect={() => {
          navigate("/todoist/create-task");
        }}
      >
        <PlusSquareIcon />
        Add Task
        <span className="ml-auto text-muted-foreground">Command</span>
      </CommandItem>
    </Command.Group>
  );
};
