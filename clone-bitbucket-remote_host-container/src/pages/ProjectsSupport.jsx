//REACT
import { useToast } from "@chakra-ui/react";
import { useEffect, useContext } from "react";
//CONTEXT
import { Context as ProjectContext } from "../context/ProjectContext";
//OTHER
import { PROJECT_TYPE } from "../helpers/constants";
import { selectProjects } from "../helpers/projects-helpers";
import { columnsProjectList } from "../models/columns-table";
import { toastError, toastSuccess } from "../models/toasts";
// COMPONENTS
import TablePageLayout from "./TablePageLayout";

//COLUMNS FOR DATA TABLE
const columns = columnsProjectList;

/**
 * gets the "Support" projects and displays them using the TablePageLayout component
 * @returns the "Support" projects
 */
const ProjectsSupport = () => {
  const activeProjectType = PROJECT_TYPE.SUPPORT;
  const toast = useToast();

  const { state: projectState, getProjectsSupport } =
    useContext(ProjectContext);

  useEffect(() => {
      getProjectsSupport();
  }, [projectState.reloadOnChange]);

  const onClickRefresh = () => {
    getProjectsSupport(false, (isSuccess) => {
      toast(
        isSuccess
          ? toastSuccess(activeProjectType)
          : toastError(activeProjectType)
      );
    });
  };

  return (
    <>
      <TablePageLayout
        title="Projets Support"
        columns={columns}
        activeProjectType={activeProjectType}
        onClickRefresh={onClickRefresh}
        projectsWrapper={selectProjects(projectState, activeProjectType)}
      />
    </>
  );
};

export default ProjectsSupport;
