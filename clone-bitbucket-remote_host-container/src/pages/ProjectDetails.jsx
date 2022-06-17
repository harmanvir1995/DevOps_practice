import { Heading } from "@chakra-ui/layout";
import { Tag, Button, Text, Flex, Box, Spacer, Image } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import DataTable from "../components/DataTable";
import { Context as ProjectContext } from "../context/ProjectContext";
import { useEffect, useContext } from "react";
import { toastError, toastSuccess } from "../models/toasts";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router";
import {columnsProjectDetails} from "../models/columns-details-table";
import Loader from "../components/Loader";
import { BASE_URL } from "../helpers/constants";
/**
 * displays the selected project details
 * @returns the project details
 */
const ProjectDetails = () => {

  const columns = columnsProjectDetails;
  const toast = useToast();
  const {projectKey} = useParams();
  const { state: projectState, getProjectDetails} = useContext(ProjectContext);

  useEffect(() => {
    getProjectDetails(true, null, projectKey);
  }, [projectState.reloadOnChange]);

  if (projectState.errorMessage) {
    return (
      <Text color="red.400" fontWeight="bold" textAlign="center">
        {projectState.errorMessage}
      </Text>
    );
  }

  const onClickRefresh = () => {
    getProjectDetails(false, (isSuccess) => {
      toast(
        isSuccess
          ? toastSuccess(projectKey)
          : toastError(projectKey)
      );
    }, projectKey);
  };
 
  return projectState.projectDetails ? (
    <>
      <Flex alignItems="center" mb={8}>
        <Heading pb={4}>{projectState.projectDetails.clientName}</Heading>
        <Spacer />
        <Box>
          {(projectState.projectDetails.avatarURL) ?  <Image boxSize="64px" src={BASE_URL + projectState.projectDetails.avatarURL} alt="" /> : null }
         
        </Box>
      </Flex>
      
      <Heading pb={4} as="h3" size="lg">
        {projectState.projectDetails.name}
      </Heading><Tag
        size="lg"
        mb={4}
        variant="outline"
        colorScheme="pink"
        borderRadius="full"
        alignSelf="flex-start"
      >
        {(projectState.projectDetails.projectType === "software") ? "Forfait" : "Support"}
      </Tag>
      <Flex alignItems="center" mb={8}>
        <Box p="2">
          <Text>Dernière synchronisation: {projectState.projectDetails.lastSync}</Text>
        </Box>
        <Spacer />
        <Box>
          <Button
            data-testid="refresh-button"
            leftIcon={<RepeatIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={onClickRefresh}
            isLoading={projectState.isLoading}
          >
            Rafraichir
          </Button>
        </Box>
      </Flex>
      <DataTable columns={columns} data={projectState.projectDetails.componentsInfos} isPaginated={true} />
      </>
    
  ) : (
      <Loader />
  );
};

export default ProjectDetails;
