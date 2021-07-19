import { useState } from "react";
import { Collaborator } from "../api/issuesAPI.types";
import { getCollaborators, postCollaborator, deleteCollaborator as APIDeleteCollaborator } from "../api/issuesAPI";

export const useCollaborators = (projectId: number) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isFetching, setFetching] = useState(false);

  const fetchCollaborators = async (): Promise<boolean> => {
    setFetching(true);
    const collaborators = await getCollaborators(projectId);
    setFetching(false);

    if (collaborators !== null) {
      setCollaborators(collaborators);
      return true;
    }

    return false;
  }

  const addCollaborator = async (username: string): Promise<boolean> => {
    setFetching(true);
    const collaborator = await postCollaborator(projectId, { username });

    if (collaborator == null) {
      setFetching(false);
      return false;
    }

    return await fetchCollaborators();
  }

  const deleteCollaborator = async (username: string): Promise<boolean> => {
    setFetching(true);
    await APIDeleteCollaborator(projectId, { username });
    return await fetchCollaborators();
  }

  return { collaborators, isFetching, fetchCollaborators, addCollaborator, deleteCollaborator };
}
