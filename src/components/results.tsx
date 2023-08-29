import { Command } from "cmdk";
import { useExtensions } from "../lib/context";
import { Fragment } from "react";

export const Results: React.FC<{ query: string }> = ({ query }) => {
  const extensions = useExtensions();

  return (
    <Command.List className="py-2 h-[calc(100vh-60px)] overflow-y-auto">
      <Command.Empty className="ml-4">No results found</Command.Empty>

      {extensions.map(({ name, group: Group }, i) => (
        <Fragment key={name}>
          <Group />
          {i !== extensions.length - 1 && <hr className="m-4" />}
        </Fragment>
      ))}
    </Command.List>
  );
};
