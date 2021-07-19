import { useState } from "react";
import { Project } from "../api/projectsAPI.types";
import {getProjects, postProject} from "../api/projectsAPI";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetching, setFetching] = useState(false);

  async function fetchProjects(): Promise<boolean> {
    setFetching(true);
    const projects = await getProjects();
    setFetching(false);

    if (projects !== null && projects.length > 0) {
      setProjects(projects);
      return true;
    }

    return false;
  }

  async function createProject(name: string): Promise<boolean> {
    setFetching(true);
    const project = await postProject(name);

    if (project == null) {
      setFetching(false);
      return false;
    }

    return await fetchProjects();
  }

  return { projects, isFetching, fetchProjects, createProject };
}
