import { Center, Spinner } from "@chakra-ui/react";

/**
 * creates a spinner.
 * @returns a loader
 */
const Loader = () => {
  return (
    <Center flex="1">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="pink.400"
        size="xl"
      />
    </Center>
  );
};

export default Loader;
