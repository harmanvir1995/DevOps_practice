// CHAKRA
import { Button, Flex, Heading, Text, Select, Box, Spacer } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
//COMPONENTS
import Loader from "../components/Loader";
import DataTable from "../components/DataTable";
import { useEffect, useContext, useRef} from "react";
import { fetchPorjectsCategories } from "../services/project.service";
import {Context as projectContext} from "../context/ProjectContext";
import { useHistory } from "react-router-dom";

/**
 * displays a table of projects with a refresh button or a message error
 * @param {*} title 
 * @param state
 * @param onClickRefresh
 * @param columns
 * @param projectsWrapper
 * @param showSelectCategories
 */
const TablePageLayout = ({
  title,
  onClickRefresh,
  columns,
  projectsWrapper,
  showSelectCategories = false,
  onSelectCategory,
}) => {
  const projectsCategoriesList = useRef([]);
  
  const {state} = useContext(projectContext);
  let history = useHistory();

  useEffect(() => {
 
    const getProjectsCategories = async ()=>{
      const projectsCategories = await fetchPorjectsCategories();
      
      projectsCategoriesList.current = projectsCategories.data
    } 
    getProjectsCategories();
  }, []);

  // (First Load) - If fetching new data and no projects yet in Context => show loader
  // (Render before everything) - If no projects yet in Context => show loader
  // (Force Reload) - If fetching but projects in Context => no loader
  if (!projectsWrapper || (state.isLoading && !projectsWrapper)) {
    return <Loader />;
  }

  if (state.errorMessage) {
    return (
      <Text color="red.400" fontWeight="bold" textAlign="center">
        {state.errorMessage}
      </Text>
    );
  }
  
  const onClickProjectDetails = (event) => {
    let url = "/project-details/" + event.target.value;
    history.push(url);
  }

  return (
    <>
      <Heading pb={8}>{title}</Heading>
      <Flex alignItems="center" mb={8}>
        <Box p="2">
          <Text>Dernière synchronisation : {projectsWrapper.lastSync}</Text>
        </Box>
        <Spacer />
        {showSelectCategories?
        <Box mr="2">
            <Select variant="filled" placeholder="Tous les projets" onChange={onSelectCategory} data-testid="select-category">
              {projectsCategoriesList.current.map(category => <option value={category.Name} key={category.id} >{category.Label ? category.Label : category.Name}</option>)}
            </Select>
        </Box>:""}
        <Box>
            <Button
              data-testid="refresh-button"
              leftIcon={<RepeatIcon />}
              colorScheme="teal"
              variant="solid"
              onClick={onClickRefresh}
              isLoading={state.isLoading}
            >
              Rafraichir
            </Button>
        </Box>
      </Flex>

      <DataTable
        columns={columns}
        data={projectsWrapper.projects.map((project) => { return {...project, onClickDetails : onClickProjectDetails}})} //adds for every projects the fct that allows to display the project details page.
        isPaginated={true}
      />
    </>
  );
};

export default TablePageLayout;
