//SERVICES
import { PROJECT_TYPE_API } from "../helpers/constants";
import { PROJECT_CATEGORY } from "../helpers/constants";
import { fetchEmployeesActivity, fetchEmployeesWorktime, fetchProjectDetails, fetchProjectsWithTimesV2, sendRefreshAllData } from "../services/project.service";
//CONTEXT
import createDataContext from "./createDataContext";

/**
 * concatenate state and action's information based on the action type
 * @param {*} state 
 * @param {*} action 
 * @returns a new state value based on the action
 */
const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "get_projects_forfait":
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        forfait: action.payload,
      };
    case "get_projects_support":
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        support: action.payload,
      };
    case "set_error":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case "set_loading":
      return {
        ...state,
        isLoading: true,
      };
    case "set_selected_category":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "get_project_details":
      return {
        ...state,
        isLoading: false,
        projectDetails: action.payload,
        errorMessage: null,
      };
    case "get_employees_worktime":
      return {
        ...state,
        isLoading: false,
        chargeability: action.payload, 
        errorMessage: null,
      };
    case "get_employees_activity":
      return {
        ...state,
        isLoading: false,
        activity: action.payload,
        errorMessage: null,
      };
    case "refresh_all_success":
      return {
        ...state,
        isLoading: false,
        reloadOnChange: state.reloadOnChange + 1,
        errorMessage: null,
      };
    default:
      return state;
  }
};

/**
 * fetches forfait projects with their temporal data.
 * If the fetch is successful, it adds the fetched data to the context.
 * If the fetch failed, it adds an error to the context.
 * @param {*} dispatch 
 * @returns 
 */
const getProjectsForfait =
  (dispatch) =>
  async (useCache = true, isSuccessCallBack, projectCategory) => {
    dispatch({ type: "set_loading" });
    try {
      const projects = await fetchProjectsWithTimesV2(
        PROJECT_TYPE_API.SOFTWARE,
        useCache,
        projectCategory
      );
      
      projects.data.lastSync = new Date(
        projects.data.lastSync
      ).toLocaleString();
      if (isSuccessCallBack) {
        isSuccessCallBack(true);
      }
      dispatch({ type: "get_projects_forfait", payload: projects.data });
    } catch (err) {
      if (isSuccessCallBack) {
        isSuccessCallBack(false);
      }
      dispatch({
        type: "set_error",
        payload:
          "Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.",
      });
    }
  };

  /**
   * fetches support projects with their temporal data.
   * If the fetch is successful, it adds the fetched data to the context.
   * If the fetch fails, it adds an error to the context.
   * @param {*} dispatch 
   */
const getProjectsSupport =
  (dispatch) =>
  async (useCache = true, isSuccessCallBack) => {
    dispatch({ type: "set_loading" });
    try {
      const projects = await fetchProjectsWithTimesV2(
        PROJECT_TYPE_API.SERVICE_DESK,
        useCache,
        PROJECT_CATEGORY.Montreal_Support,
      );
      projects.data.lastSync = new Date(
        projects.data.lastSync
      ).toLocaleString();
      if (isSuccessCallBack) {
        isSuccessCallBack(true);
      }
      dispatch({ type: "get_projects_support", payload: projects.data });
    } catch (err) {
      if (isSuccessCallBack) {
        isSuccessCallBack(false);
      }
      dispatch({
        type: "set_error",
        payload:
          "Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.",
      });
    }
  };

  /**
   * it adds an error to the context.
   * @param {*} dispatch 
   */
const setError = (dispatch) => (errorMessage) => {
  dispatch({
    type: "set_error",
    payload: errorMessage,
  });
};

const setSelectedCategory = (dispatch) => (selectedCategory) => {
  dispatch({
    type: "set_selected_category",
    payload: selectedCategory,
  });
}

/**
   * fetches project details.
   * If the fetch is successful, it adds the fetched data to the context.
   * If the fetch fails, it adds an error to the context.
   * @param {*} dispatch 
   */
const getProjectDetails = 
  (dispatch) => 
  async (useCache = true, isSuccessCallBack, projectKey) => {
    dispatch({ type: "set_loading" });
    try {
      const projects = await fetchProjectDetails(
        useCache,
        projectKey
      );
      
      projects.data.lastSync = new Date(
        projects.data.lastSync
      ).toLocaleString();
      if (isSuccessCallBack) {
        isSuccessCallBack(true);
      }
      dispatch({ type: "get_project_details", payload: projects.data });
    } catch (err) {
      if (isSuccessCallBack) {
        isSuccessCallBack(false);
      }
      dispatch({
        type: "set_error",
        payload:
          "Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.",
      });
    }
};

/**
 * 
 * @param {*} dispatch 
 * @returns 
 */
const getEmployeesWorktime =
  (dispatch) => 
  async (useCache = true, isSuccessCallBack, startDate, endDate) => {
    dispatch({ type: "set_loading" });
    try {
      const employeesWorktime = await fetchEmployeesWorktime(
        useCache,
        startDate,
        endDate,
      );
      
      employeesWorktime.data.lastSync = new Date(
        employeesWorktime.data.lastSync
      ).toLocaleString();

      /*Displays toasts*/
      if (isSuccessCallBack) {
        isSuccessCallBack(true);
      }

      dispatch({ type: "get_employees_worktime", payload: employeesWorktime.data });
    } catch (err) {
      if (isSuccessCallBack) {
        isSuccessCallBack(false);
      }
      dispatch({
        type: "set_error",
        payload:
          "Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.",
      });
    }
  }

  const getEmployeesActivity =
  (dispatch) => 
  async (useCache = true, isSuccessCallBack, startDate, endDate) => {
    dispatch({ type: "set_loading" });
    try {
      const employeesActivity = await fetchEmployeesActivity(
        useCache,
        startDate,
        endDate,
      );
      
      employeesActivity.data.lastSync = new Date(
        employeesActivity.data.lastSync
      ).toLocaleString();

      /*Displays toasts*/
      if (isSuccessCallBack) {
        isSuccessCallBack(true);
      }

      dispatch({ type: "get_employees_activity", payload: employeesActivity.data });
    } catch (err) {
      if (isSuccessCallBack) {
        isSuccessCallBack(false);
      }
      dispatch({
        type: "set_error",
        payload:
          "Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.",
      });
    }
  }

  /**
   * Requests Strapi to refresh all data without fetching any and update the load state.
   * @param {*} dispatch 
   */
  const refreshAllData =
  (dispatch) => 
  async (isSuccessCallBack) => {
    dispatch({ type: "set_loading" });
    try {
      await sendRefreshAllData();
      
      /*Displays toasts*/
      if (isSuccessCallBack) {
        isSuccessCallBack(true);
      }

      dispatch({ type: "refresh_all_success" });
    } catch (err) {
      if (isSuccessCallBack) {
        isSuccessCallBack(false);
      }
      dispatch({
        type: "set_error",
        payload:
          "Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.",
      });
    }
  }

/**
 * create and export the context ProjectContext and its provider
 */
export const { Context, Provider } = createDataContext(
  ProjectReducer,
  /*actions*/
  { 
    getProjectsForfait,
    getProjectsSupport, 
    setError, 
    setSelectedCategory,
    getProjectDetails,
    getEmployeesWorktime,
    getEmployeesActivity,
    refreshAllData
  },

  /*Initial state*/
  {
    forfait: null,
    support: null,
    isLoading: true,
    errorMessage: null,
    selectedCategory: null,
    projectDetails: null,
    chargeability: null,
    activity: null,
    reloadOnChange: 0,
  }
);
