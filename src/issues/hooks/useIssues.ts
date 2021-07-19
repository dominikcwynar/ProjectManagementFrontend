import { useState } from "react";
import {Collaborator, Issue} from "../api/issuesAPI.types";
import {getIssues, postAssignUser, postIssue} from "../api/issuesAPI";

export function useIssues(projectId: number) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isFetching, setFetching] = useState(false);

  async function fetchIssues(): Promise<boolean> {
    setFetching(true);
    const result = await getIssues(projectId);
    setFetching(false);

    if (result !== null) {
      setIssues(result);
      return true;
    }

    return false;
  }

  async function createIssue(name: string, description: string | null = null): Promise<boolean> {
    setFetching(true);
    const issue = await postIssue(projectId, name, description);

    if (issue == null) {
      setFetching(false);
      return false;
    }

    return await fetchIssues();
  }

  async function assignUser(user: Collaborator, issue: Issue): Promise<boolean> {
    setFetching(true);
    await postAssignUser(projectId, issue.id, user);
    return await fetchIssues();
  }

  return { issues, isFetching, fetchIssues, createIssue, assignUser };
}
