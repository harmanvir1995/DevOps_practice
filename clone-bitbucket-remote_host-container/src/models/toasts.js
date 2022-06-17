/** 
 * @param {*} projectType
 * @returns an object including information to be used by a toast.
 */
export const toastSuccess = (projectType) => {
  return {
    title: "Data actualisée",
    description: `Projets ${projectType ?? ""} actualisés. Enjoy !`,
    status: "success",
    duration: 5000,
    isClosable: true,
  };
};

/**
 * @param {*} projectType 
 * @returns an object including information to be used by a toast.
 */
export const toastError = (projectType) => {
  return {
    title: "Oups petit problème",
    description: `Projets ${projectType ?? ""} non actualisés.`,
    status: "error",
    duration: 5000,
    isClosable: true,
  };
};
