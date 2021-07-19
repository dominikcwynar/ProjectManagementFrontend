import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { FaIndent, FaDoorOpen } from "react-icons/fa";
import { UserMenu } from "./UserMenu";
import { SideButtons } from "./SideButtons";
import {useAuth} from "../../authentication/context/AuthProvider";
function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const { logout } = useAuth();

  const onLogout = () => {
    logout();
  }

  return (
    <>
      <Button
        color="blue.300"
        colorScheme="transparent"
        onClick={onOpen}
        size="lg"
        justifyContent="center"
        _hover={{ fontSize: "2xl" }}
      >
        {<FaIndent />}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        variant="persistent"
        trapFocus={false}
        useInert={false}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton _hover={{ fontSize: "2xl" }} color="#fff">
              {<FaIndent />}
            </DrawerCloseButton>
            <DrawerHeader bg={"gray.700"} color="#fff">Project Manager</DrawerHeader>
            <DrawerBody bg={"gray.700"}>
              <SideButtons />
              <UserMenu />
            </DrawerBody>
            <DrawerFooter bg={"gray.700"}>
              <Button
                color={"gray.50"}
                colorScheme="transparent"
                onClick={onLogout}
                size="lg"
                justifyContent="center"
                _hover={{ fontSize: "2xl" }}
              >
                {<FaDoorOpen />}
              </Button>
              <ColorModeSwitcher justifySelf="flex-end" />
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default SideMenu;
