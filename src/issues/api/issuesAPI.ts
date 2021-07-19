import axios from "axios";
import { Issue, User, Collaborator } from "./issuesAPI.types";

export const postIssue = (
  projectId: number,
  name: string,
  description: string | null = null
): Promise<Issue | null> => (
  axios
    .post(`/api/projects/${projectId}/issues`, {
      name,
      description,
    })
    .then(response => response.data)
    .catch(() => null)
);

export function getIssues(projectId: number): Promise<Issue[]> {
  return axios
    .get(`/api/projects/${projectId}/issues`)
    .then(response => response.data)
    .catch(() => null);
}

export const updateIssue = (
  issue: Issue,
  projectId: number
): Promise<Issue | null> => (
  axios
    .put(`/api/projects/${projectId}/issues/${issue.id}`, issue)
    .then(response => response.data)
    .catch(() => null)
);

export const getUsers = (): Promise<User[] | null> => (
  axios
    .get('/api/users')
    .then(response => response.data)
    .catch(() => null)
);

export const getCollaborators = (projectId: number): Promise<Collaborator[] | null> => (
  axios
    .get(`/api/projects/${projectId}/collaborators`)
    .then(response => response.data)
    .catch(() => null)
);

export const postCollaborator = (
  projectId: number,
  username: Collaborator
): Promise<Collaborator | null> => (
  axios
    .post(`/api/projects/${projectId}/collaborators`, username)
    .then(response => response.data)
    .catch(() => null)
);

export const deleteCollaborator = (
  projectId: number,
  username: Collaborator
): Promise<boolean> => (
  axios
    .delete(`/api/projects/${projectId}/collaborators?name=${username.username}`)
    .then(response => response.data)
    .catch(() => null)
);

export const postAssignUser = (
  projectId: number,
  issueId: number,
  user: Collaborator
): Promise<boolean> => (
  axios
    .post(`/api/projects/${projectId}/issues/${issueId}/assign`, user)
    .then(response => response.status === 200)
    .catch(() => false)
);

export const getAssignableUsers = (projectId: number): Promise<Collaborator[] | null> => (
  axios
    .get(`/api/projects/${projectId}/assignable`)
    .then(response => response.data)
    .catch(() => null)
);