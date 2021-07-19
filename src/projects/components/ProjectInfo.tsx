import { Button, Box, VStack } from "@chakra-ui/react";
import React from "react";
import { Project } from "../api/projectsAPI.types";
import { Link } from "react-router-dom";
import { Routes } from "../../routing/routes";
interface Props {
  project: Project;
}

export const ProjectInfo: React.FC<Props> = ({ project }) => {
  return (
    <VStack>
      <Link to={Routes.ISSUES.replace(":projectId", project.id.toString())}>
        <Box
          as={Button}
          w="160px"
          h="160px"
          borderRadius="lg"
          textAlign="center"
          fontSize="72px"
          colorScheme="primary"
          color="#fff"
          boxShadow="lg"
        >
          {project.id}
        </Box>
      </Link>
      <Box width="fit-content">{project.name}</Box>
    </VStack>
  );
};
