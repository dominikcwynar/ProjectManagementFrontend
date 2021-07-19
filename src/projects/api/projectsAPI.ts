import axios from "axios";
import { Project } from "./projectsAPI.types";

export const postProject = (name: string): Promise<Project | null> =>
  axios
    .post("/api/projects", {
      name,
    })
    .then((response) => response.data)
    .catch(() => null);

export function getProjects(): Promise<Project[]> {
  return axios
    .get("/api/projects")
    .then((response) => response.data)
    .catch(() => null);
}

export function getProject(projectId: number): Promise<Project> {
  return axios
    .get(`/api/projects/${projectId}`)
    .then((response) => response.data)
    .catch(() => null);
}