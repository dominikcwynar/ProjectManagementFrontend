import { useState } from "react";
import {Collaborator} from "../api/issuesAPI.types";
import {getAssignableUsers} from "../api/issuesAPI";

export function useAssignableUsers(projectId: number) {
  const [assignableUsers, setAssignableUsers] = useState<Collaborator[]>([]);
  const [isFetching, setFetching] = useState(false);

  async function fetchAssignableUsers(): Promise<boolean> {
    setFetching(true);
    const users = await getAssignableUsers(projectId);
    setFetching(false);

    if (users !== null && users.length > 0) {
      setAssignableUsers(users);
      return true;
    }

    return false;
  }

  return { assignableUsers, isFetching, fetchAssignableUsers };
}
