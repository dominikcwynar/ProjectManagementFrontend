import { useState } from "react";
import { User } from "../api/issuesAPI.types";
import { getUsers } from "../api/issuesAPI";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setFetching] = useState(false);

  async function fetchUsers(): Promise<boolean> {
    setFetching(true);
    const users = await getUsers();
    setFetching(false);

    if (users !== null && users.length > 0) {
      setUsers(users);
      return true;
    }

    return false;
  }

  return { users, isFetching, fetchUsers };
}
