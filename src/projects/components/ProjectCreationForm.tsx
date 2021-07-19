import React from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  VStack,
  Box,
} from "@chakra-ui/react";
export interface ProjectCreationFormData {
  name: string;
}

interface Props {
  onSubmit: (data: ProjectCreationFormData) => void;
}

export const ProjectCreationForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<ProjectCreationFormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack>
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
        onClick={onOpen}
      >
        +
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent bg={"gray.700"} color="#fff">
          <ModalHeader>Create a new Project</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Input
                name={"name"}
                defaultValue={"New Project"}
                ref={register({ required: true })}
              />
              {errors.name && <span>Project's name is required!</span>}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="primary" mr={3} color="#fff" type={"submit"}>
                Save
              </Button>
              <Button colorScheme="secondary" onClick={onClose} color="#fff">
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Box width="fit-content">Create Project</Box>
    </VStack>
  );
};
