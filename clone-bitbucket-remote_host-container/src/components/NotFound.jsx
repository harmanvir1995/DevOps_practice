import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

/**
 * @returns a not found page message with a button redirecting to the home page.
 */
const NotFound = () => {
  return (
    <Flex p={8} direction="column" alignItems="center">
      <Heading>Oups ! Cette page n'existe pas ...</Heading>
      <Button my={8} as={RouteLink} to="/">
        Retour à l'accueil
      </Button>
    </Flex>
  );
};

export default NotFound;
