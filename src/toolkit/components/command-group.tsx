import { Command } from "cmdk";

export const CommandGroup: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <Command.Group title={title}>
      <h2 className="text-muted-foreground ml-4 mb-2">{title}</h2>
      {children}
    </Command.Group>
  );
};
