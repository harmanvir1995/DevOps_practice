import strapiApi from "../api/strapiApi";

/**
 * fetches projects of specific type and category with a GET request
 * @param {*} projectType 
 * @param {*} useCache 
 * @param {*} projectCategory
 * @returns a promise
 */
export function fetchProjects(projectType, useCache, projectCategory) {
  return strapiApi.get("/projects", {
    params: {
      projectType,
      useCache,
      projectCategory,
    },
  });
}

/**
 * fetches a specific project with a get request using a key
 * @param {*} key 
 * @param {*} useCache 
 * @returns a promise
 */
export function fetchProject(key, useCache) {
  return strapiApi.get(`/projects/${key}`, {
    params: {
      useCache,
    },
  });
}

/**
 * fetches projects of specific type and category and their corresponding temporal data with a GET request 
 * @param {*} projectType 
 * @param {*} useCache 
 * @param {*} projectCategory
 * @returns a promise
 */
export function fetchProjectsWithTimes(projectType, useCache, projectCategory) {
  return strapiApi.get(`/projectsWithTimes`, {
    params: {
      projectType,
      useCache,
      projectCategory,
    },
  });
}

/**
 * fetches projects of specific type and category and their corresponding temporal data with a GET request 
 * @param {*} projectType 
 * @param {*} useCache 
 * @returns a promise
 */
export function fetchProjectsWithTimesV2(projectType, useCache, projectCategory) {
  return strapiApi.get(`/projectsWithTimesV2`, {
    params: {
      projectType,
      useCache,
      projectCategory,
    },
  });
}

/**
 * fetches the list of projects categories with GET request
 * @returns a promise
 */
export async function fetchPorjectsCategories()  {
  return await strapiApi.get('/projects-categories');
}

/**
 * fetches the project details with a GET request.
 * @returns a promise
 */
export function fetchProjectDetails(useCache, projectKey) {
  return strapiApi.get(`/projectDetails/${projectKey}`, {
    params: {
      useCache,
    },
  });
}

/**
 * fetches employees working hours of a specific period of time with a GET request
 * @param {*} useCache 
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns a promise
 */
export function fetchEmployeesWorktime(useCache, startDate, endDate) {
  return strapiApi.get(`/employeesWorktime`, {
    params: {
      useCache,
      startDate,
      endDate,
    },
  });
}

/**
 * fetches employeesactivity of a specific period of time with a GET request
 * @param {*} useCache 
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns a promise
 */
export function fetchEmployeesActivity(useCache, startDate, endDate) {
  return strapiApi.get(`/activity`, {
    params: {
      useCache,
      startDate,
      endDate,
    },
  });
}

/**
 * send a request to Strapi to update all data
 * @returns a promise
 */
  export function sendRefreshAllData() {
    return strapiApi.post(`/updateAll`, {});
}