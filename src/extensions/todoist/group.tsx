import { Command } from "cmdk";
import { PlusSquareIcon } from "lucide-react";
import { useLocation } from "wouter";
import { CommandItem } from "../../toolkit/components/command-item";

export const TodoistGroup: React.FC = () => {
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
