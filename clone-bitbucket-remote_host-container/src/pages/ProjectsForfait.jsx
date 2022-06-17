//REACT
import { useEffect, useContext } from "react";
// CHAKRA
import { useToast } from "@chakra-ui/react";
//CONTEXT
import { Context as ProjectContext } from "../context/ProjectContext";
//OTHER
import { PROJECT_TYPE } from "../helpers/constants";
import { selectProjects } from "../helpers/projects-helpers";
import { columnsProjectList } from "../models/columns-table";
import { toastError, toastSuccess } from "../models/toasts";
//COMPONENTS
import TablePageLayout from "./TablePageLayout";

//COLUMNS FOR DATA TABLE
const columns = columnsProjectList;

/**
 * gets the "Forfait" projects and diplays them using the TablePageLayout component
 * @returns the "Forfait" projects
 */
const ProjectsForfait = () => {
  const toast = useToast();
  const activeProjectType = PROJECT_TYPE.FORFAIT;

  const { state: projectState, getProjectsForfait, setSelectedCategory} =
    useContext(ProjectContext);
  useEffect(() => {
      getProjectsForfait();

  }, [projectState.reloadOnChange]);

  const onClickRefresh = () => {
    getProjectsForfait(false, (isSuccess) => {
      toast(
        isSuccess
          ? toastSuccess(activeProjectType)
          : toastError(activeProjectType)
      );
    },projectState.selectedCategory);
  };
  
  const onSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
    getProjectsForfait(true, (isSuccess) => {
      toast(
        isSuccess
          ? toastSuccess(activeProjectType)
          : toastError(activeProjectType)
      );
    }, event.target.value);
  }

  return (
    <>
      <TablePageLayout
        title="Projets Forfait"
        columns={columns}
        onClickRefresh={onClickRefresh}
        projectsWrapper={selectProjects(projectState, activeProjectType)}
        showSelectCategories={true}
        onSelectCategory={onSelectCategory}
      />
    </>
  );
};

export default ProjectsForfait;
