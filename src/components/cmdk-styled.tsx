// reexports everything from cmdk, but with styles

import { Command } from "cmdk";
import { type ComponentProps, forwardRef } from "react";
import { cn } from "../lib/cn";

const itemClassNames = cn(
  "px-4 py-3",
  "data-[selected=true]:bg-neutral-700/20"
);

export const CommandItem = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Command.Item>
>((props, ref) => {
  return (
    <Command.Item
      {...props}
      className={cn(itemClassNames, props.className)}
      ref={ref}
    />
  );
});
