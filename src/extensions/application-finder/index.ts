import { CreateExtension } from "../../toolkit/extension";
import { ApplicationsGroup } from "./group";

export const applicationFinder: CreateExtension = () => ({
  name: "Application Finder",
  group: ApplicationsGroup,
});
