import React from "react";
import { useForm } from "react-hook-form";
import {
  useDisclosure,
  VStack,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

export interface IssueCreationFormData {
  name: string;
  description: string | null;
}

interface Props {
  onSubmit: (data: IssueCreationFormData) => void;
}

export const IssueCreationForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<IssueCreationFormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack>
      <Box
        as={Button}
        width="fit-content"
        height="fit-content"
        padding="5px"
        borderRadius="lg"
        textAlign="center"
        fontSize="18px"
        colorScheme="primary"
        color="#fff"
        boxShadow="lg"
        onClick={onOpen}
      >
        Add issue
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent color="#fff" bg={"gray.700"}>
          <ModalHeader>Add an issue</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack>
                <Input
                  name={"name"}
                  defaultValue={"New issue"}
                  ref={register({ required: true })}
                />
                {errors.name && <span>Issue name is required!</span>}
                <Input
                  name={"description"}
                  defaultValue={"Describe your issue"}
                  ref={register}
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="primary"
                mr={3}
                color="#fff"
                type={"submit"}
                onClick={onClose}
              >
                Save
              </Button>
              <Button colorScheme="secondary" onClick={onClose} color="#fff">
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
