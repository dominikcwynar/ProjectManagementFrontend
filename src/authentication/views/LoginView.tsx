import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Flex, Heading } from "@chakra-ui/react";

export const LoginView: React.FC = () => {
  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Flex
        width="100%"
        maxWidth="500px"
        alignItems="center"
        flexDirection="column"
      >
        <Heading mb={6} color="#0F4C81">
          Log In to use the app
        </Heading>
        <LoginForm />
      </Flex>
    </Flex>
  );
};
