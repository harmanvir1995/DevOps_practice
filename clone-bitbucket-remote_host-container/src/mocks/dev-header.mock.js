// CHAKRA
import {
  Box,
  Button,
  Collapse,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

//REACT ROUTER
import { Link as RouteLink } from "react-router-dom";

const DevHeader = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Button
        backgroundColor="white"
        size="xs"
        alignSelf="flex-end"
        onClick={onToggle}
      >
        Dev Menu
      </Button>
      <Collapse in={isOpen}>
        <Box p={4} borderWidth="1px">
          <Text>Dev Only - For testing purpose</Text>
          <UnorderedList>
            <ListItem>
              <Link as={RouteLink} colorScheme="pink" to="/project-list">
                Bad route
              </Link>
            </ListItem>

            <ListItem>
              <Link as={RouteLink} colorScheme="pink" to="/projects-forfait">
                Liste des projets
              </Link>
            </ListItem>

            <ListItem>
              <Link as={RouteLink} colorScheme="pink" to="/project-details/1">
                Projet 1 - MOCK
              </Link>
            </ListItem>

            <ListItem>
              <Link as={RouteLink} colorScheme="pink" to="/login">
                Login
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </Collapse>
    </>
  );
};

export default DevHeader;
