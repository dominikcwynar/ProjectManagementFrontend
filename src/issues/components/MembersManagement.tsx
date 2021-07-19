import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUsers } from "../hooks/useUsers";
import { useCollaborators } from "../hooks/useCollaborators";
import { useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  useDisclosure,
  VStack,
  HStack,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react";

interface FormData {
  username: string;
}

export const MembersManagement: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, fetchUsers } = useUsers();
  const { projectId } = useParams();
  const collaborators = useCollaborators(projectId);
  const onSubmit = async (data: FormData) => {
    const username = data.username;
    await collaborators.addCollaborator(username);
  }

  useEffect(() => {
    fetchUsers();
    collaborators.fetchCollaborators();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        Manage members
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent color="#fff" bg={"gray.700"}>
          <ModalHeader>Manage members</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack>
                <Select 
                  name="username"
                  placeholder="Select user to invite"
                  color={"gray.700"}
                  bg={"white"}
                  ref={register({ required: true })}>
                  {users.map(user => (
                    <option key={user.userName} value={user.userName}>{user.userName}</option>
                  ))}
                </Select>
                {errors.username && <span>Username is required!</span>}
                <Accordion allowToggle width="full">
                  <AccordionItem
                    color={"gray.700"}
                    bg={"white"}
                    borderRadius={6}
                  >
                    <AccordionButton pr={"10px"}>
                      <Box flex="1" textAlign="left">
                        Show current collaborators
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <VStack>
                        {collaborators.collaborators.map(collaborator => (
                          <HStack key={collaborator.username} justify="space-between" width="full">
                            <Box>{collaborator.username}</Box>
                            <Button variant="transparent" onClick={() => collaborators.deleteCollaborator(collaborator.username)}>
                              <FaRegTrashAlt />
                            </Button>
                          </HStack>
                        ))}
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
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
                Invite
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
