import { Link, useLocation } from "wouter";
import { ArrowLeftIcon } from "lucide-react";
import { useZodForm } from "../../../lib/use-zod-form";
import { z } from "zod";
import { useEffect } from "react";
import { createTask } from "../api";

const schema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
});

export const CreateTaskPage: React.FC = () => {
  const [, navigate] = useLocation();
  const form = useZodForm({
    schema,
  });

  useEffect(() => {
    form.setFocus("name");
  }, []);

  return (
    <div className="m-4">
      <Link to="/">
        <ArrowLeftIcon />
      </Link>

      <form
        className="mt-8 flex flex-col"
        onSubmit={form.handleSubmit(async (values) => {
          await createTask({
            content: values.name,
            description: values.description,
          });
          navigate("/");
        })}
      >
        <div className="border rounded-md p-4 bg-muted flex flex-col gap-4">
          <input
            placeholder="Name"
            className="bg-transparent outline-none text-2xl"
            {...form.register("name")}
          />
          <textarea
            placeholder="Description"
            className="bg-transparent outline-none resize-none h-48"
            {...form.register("description")}
          />
        </div>

        <button className="mt-2 ml-auto bg-purple-500 px-6 py-2 rounded focus:ring-1 ring-offset-2 ring-offset-background ring-purple-500 outline-none">
          Create
        </button>
      </form>
    </div>
  );
};
