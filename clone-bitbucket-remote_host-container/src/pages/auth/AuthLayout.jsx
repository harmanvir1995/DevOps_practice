//CHAKRA
import { Box, Center, Flex, Image, Link, Text } from "@chakra-ui/react";

//REACT ROUTER
import { useLocation } from "react-router-dom";
import { Link as RouteLink } from "react-router-dom";

//ASSETS
import logo from "../../assets/logo-app.svg";

/**
 * displays the logo, a forgot-password link 
 * or a login link if the location is the forgot-password page
 * @param {*} props 
 * @returns the authentfication layout component
 */
const AuthLayout = (props) => {
  const location = useLocation();

  return (
    <Flex
      bg={"gray.100"}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
      alignItems="center"
    >
      <Box maxW="md" mx="auto" flex="1" minW={{ lg: "500px" }}>
        <Center>
          <Image src={logo} alt="Logo app" m="2" minWidth="300px" />
        </Center>
        <Box
          bg="white"
          py="8"
          px={{ base: "4", md: "10" }}
          shadow="base"
          rounded={{ sm: "lg" }}
          borderTopColor="pink.500"
          borderTopWidth="4px"
        >
          {props.children} {/* AuthLayout children are specified in the Authflow component */}
        </Box>
        <Text fontSize="md" mt="2" textAlign="center">
          {location.pathname.includes("/login") ? (
            <Link as={RouteLink} to="/forgot-password">
              Mot de passe oublié ?
            </Link>
          ) : (
            <Link as={RouteLink} to="/login">
              Prêt à vous connecter ?
            </Link>
          )}
        </Text>
      </Box>
    </Flex>
  );
};

export default AuthLayout;
