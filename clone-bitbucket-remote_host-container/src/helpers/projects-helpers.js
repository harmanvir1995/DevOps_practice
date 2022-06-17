// Verify if a project exists depending on the project type
export const hasProjects = (state, projectType) => {
  return (
    state &&
    state[projectType] &&
    state[projectType].projects &&
    state[projectType].projects.length >=0
  );
};

// Select in state the correct projects depending on the project type
export const selectProjects = (projectState, activeProjectType) => {
  if (hasProjects(projectState, activeProjectType)) {
    const { [activeProjectType]: projectsWrapper } = projectState;
    return projectsWrapper;
  }
};
