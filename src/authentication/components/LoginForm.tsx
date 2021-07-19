import React, { useState } from "react";
import {
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";
import { Routes } from "../../routing/routes";

interface Inputs {
  login: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm<Inputs>();
  const [loginError, setLoginError] = useState<boolean>(false);
  const onSubmit = async (data: Inputs) => {
    await login(data.login, data.password).then((success) =>
      setLoginError(!success)
    );
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.login} isRequired>
        <FormLabel color="#9E6EB5">Login</FormLabel>
        <Input
          name="login"
          type="text"
          placeholder="Enter email address or username"
          borderColor="#9E6EB5"
          focusBorderColor="#9E6EB5"
          borderRadius={14}
          ref={register({ required: "This field is required!" })}
        />
        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt={3} isInvalid={!!errors.password} isRequired>
        <FormLabel color="#9E6EB5">Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Enter password"
          borderColor="#9E6EB5"
          focusBorderColor="#9E6EB5"
          borderRadius={14}
          ref={register({ required: "This field is required!" })}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={loginError}>
        <FormErrorMessage>Wrong username/email or password!</FormErrorMessage>
      </FormControl>
      <Flex justifyContent="space-between" mt={6}>
        <Button
          type="submit"
          width="45%"
          borderRadius={14}
          bgColor="#0F4C81"
          color="#FFFFFF"
          isLoading={isSubmitting}
          _hover={{ bgColor: "#9E6EB5", transform: "scale(1.02)" }}
          _active={{ bgColor: "#9E6EB5", transform: "scale(1.02)" }}
        >
          Log In
        </Button>
        <Button
          width="45%"
          bgColor="#FFFFFF"
          border="1px"
          borderRadius={14}
          borderColor="#9E6EB5"
          color="#9E6EB5"
          onClick={() => history.push(Routes.REGISTER)}
          _hover={{ bgColor: "#FFFFFF", transform: "scale(1.02)" }}
          _active={{ bgColor: "#FFFFFF", transform: "scale(1.02)" }}
        >
          Sign Up
        </Button>
      </Flex>
    </form>
  );
};
