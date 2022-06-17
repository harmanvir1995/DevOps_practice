import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { HamburgerIcon, Icon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Image } from "@chakra-ui/react";

import DrawerMenu from "./DrawerMenu";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect } from "react";
import { Context } from "../context/AuthContext";
import { BASE_URL } from "../helpers/constants";

/**
 * displays a hamburger button,
 * displays the drawer menu when we click on the hamburger button,
 * displays the user name button,
 * displays a menu when we click on the user name button :
 * - Mon profil : TODO
 * - Se déconnecter : calls the context "signout"
 * @param {*} props 
 * @returns the main layout component
 */
const MainLayout = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {signout, state, getUserInfo} = useContext(Context);
  
  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Flex p={10} direction={"column"}>
      <DrawerMenu isOpen={isOpen} onClose={onClose} />
      <Flex py={4} justifyContent={"space-between"}>
        <IconButton
          bg={"transparent"}
          onClick={onOpen}
          icon={<HamburgerIcon h={8} w={8} />}
        />
        <Menu>
          <MenuButton >
            <Flex alignItems="center" data-testid='menu-button-id'>
              {state.username} {(state.userInfo && state.userInfo.Avatar && state.userInfo.Avatar.url) ? <Image ml={2} boxSize="32px" src={BASE_URL + state.userInfo.Avatar.url} alt="Avatar" /> : <Icon as={CgProfile} h={6} w={6} />}
            </Flex>
          </MenuButton>
          <MenuList >
            <MenuItem>Mon profil</MenuItem>
            <MenuItem onClick={signout}>Se déconnecter</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex py={1} direction={"column"}>
        {props.children}
      </Flex>
    </Flex>
  );
};

export default MainLayout;
