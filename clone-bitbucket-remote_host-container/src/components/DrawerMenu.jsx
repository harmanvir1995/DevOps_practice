//CHAKRA
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

//ASSETS
import logo from "../assets/logo.svg";

import { Link as RouteLink } from "react-router-dom";
import { useContext} from "react";
import { toastError, toastSuccess } from "../models/toasts";
import { useToast } from "@chakra-ui/react";


import {Context as projectContext} from "../context/ProjectContext";

/**
 * displays the drawer menu that contains 4 buttons :
 * -Projets forfait : changes the route to "/projects-forfait"
 * -Projets support : changes the route to "/projects-support"
 * -Chargeabilité
 * -Activity
 * @param {boolean, function} props 
 * @param isOpen: tells if the menu is open
 * @param onClose: function that closes the menu
 * @returns 
 */
const DrawerMenu = ({ isOpen, onClose }) => {
  
  const {state, refreshAllData} = useContext(projectContext);
  const toast = useToast();
  const onRefreshAllData = () => {
    refreshAllData( (isSuccess) => {
      toast(
        isSuccess
          ? toastSuccess("")
          : toastError("")
      );
    });
    onClose();
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image src={logo} alt="Logo Compte Heure" />
          </DrawerHeader>

          <DrawerBody>
            <Flex direction="column">
              {/*<Button my={2}>Tableau de bord</Button>*/}
              <Button
                my={2}
                as={RouteLink}
                onClick={onClose}
                to="/projects-forfait"
              >
                Projets forfait
              </Button>
              <Button
                my={2}
                as={RouteLink}
                onClick={onClose}
                to="/projects-support"
              >
                Projets support
              </Button>
              <Button 
                my={2}
                as={RouteLink}
                onClick={onClose}
                to="/chargeability"
              >
                Chargeabilité
              </Button>
              <Button 
                my={2}
                as={RouteLink}
                onClick={onClose}
                to="/activity"
              >
                Activité
              </Button>
              {/*<Button my={2}>Mon compte</Button>*/}
            </Flex>
          </DrawerBody>
          
          <DrawerFooter>
            <Button 
              data-testid="refresh-all-button"
              my={2}
              leftIcon={<RepeatIcon />}
              colorScheme="teal"
              variant="solid"
              onClick={onRefreshAllData}
              isLoading={state.isLoading}
            >
              Tout rafraichir
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
