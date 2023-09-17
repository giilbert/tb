import { PlusSquareIcon } from "lucide-react";
import { useLocation } from "wouter";
import { CommandItem } from "../../toolkit/components/command-item";
import { CommandGroup } from "../../toolkit/components/command-group";

export const TodoistGroup: React.FC = () => {
  const [, navigate] = useLocation();

  return (
    <CommandGroup title="Todoist">
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
    </CommandGroup>
  );
};
