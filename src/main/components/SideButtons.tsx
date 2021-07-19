import React from "react";
import { Button, VStack } from "@chakra-ui/react";
import { FaRegCheckSquare, FaHome } from "react-icons/fa";
import { Routes } from "../../routing/routes";
import { useHistory } from "react-router-dom";
export const SideButtons: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <br></br>
      <VStack>
        <Button
          colorScheme="secondary"
          w="100%"
          leftIcon={<FaHome />}
          justifyContent="left"
          color="gray.200"
          onClick={() => history.push(Routes.HOME)}
        >
          Home
        </Button>
      </VStack>

      <br></br>
      <br></br>
    </>
  );
};
