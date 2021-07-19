import { useState } from "react";
import { Project } from "../api/projectsAPI.types";
import { getProject } from "../api/projectsAPI";

export function useProjectDetails(projectId: number) {
  const [project, setProject] = useState<Project | null>(null);
  const [isFetching, setFetching] = useState(false);

  async function fetchProject(): Promise<boolean> {
    setFetching(true);
    const result = await getProject(projectId);
    setFetching(false);
    
    if (result !== null) {
      setProject(result);
      return true;
    }

    return false;
  }

  return { project, isFetching, fetchProject };
}
