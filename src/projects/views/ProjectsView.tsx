import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Skeleton,
  SimpleGrid,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ProjectsList } from "../components/ProjectsList";
import {
  ProjectCreationForm,
  ProjectCreationFormData,
} from "../components/ProjectCreationForm";
import { useProjects } from "../hooks/useProjects";

export const ProjectsView: React.FC = () => {
  const { projects, isFetching, fetchProjects, createProject } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [error, setError] = useState<string | null>(null);

  const onProjectCreate = async (data: ProjectCreationFormData) => {
    const result = await createProject(data.name);

    if (!result) {
      setError("Something went wrong while creating the project.");
    } else {
      setError(null);
    }
  };

  return (
    <VStack
      direction="row"
      align="left"
      paddingTop="50px"
      paddingLeft="15%"
      w="90%"
    >
      <Box width="fit-content" fontSize="20px">
        Browse Projects
      </Box>
      <hr />

      <Skeleton isLoaded={!isFetching} startColor="#fff" endColor="blue.300">
        {error !== null && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <SimpleGrid minChildWidth="160px" spacing="10px" paddingTop="20px">
          {isFetching ? (
            <div>Fetching...</div>
          ) : (
            <ProjectsList projects={projects} />
          )}
          <ProjectCreationForm onSubmit={onProjectCreate} />
        </SimpleGrid>
      </Skeleton>
    </VStack>
  );
};
