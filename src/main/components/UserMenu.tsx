import {Box, HStack} from "@chakra-ui/react";
import React from "react";
import {FaUser} from "react-icons/fa";
import {useAuth} from "../../authentication/context/AuthProvider";

export const UserMenu: React.FC = () => {
  const {username} = useAuth();

  return (
    <HStack w="100% " color="#fff" fontSize="xl" paddingLeft="3px">
      <Box color="#fff" colorScheme="transparent">
        <FaUser/>
      </Box>
      <Box w="100%" textAlign="center">
        {username ?? "Unauthenticated"}
      </Box>
    </HStack>
  );
};
