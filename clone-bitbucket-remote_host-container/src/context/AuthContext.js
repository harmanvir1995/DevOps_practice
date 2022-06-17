import createDataContext from "./createDataContext";
import strapiApi from "../api/strapiApi";


/**
 * concatenate state and action's information based on the action type
 * @param {*} state 
 * @param {*} action 
 * @returns a new state value
 */
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return {
        errorMessage: null,
        successMessage: null,
        token: action.payload.token,
        username: action.payload.username,
      };

    case "signout":
      return { errorMessage: null, successMessage: null, token: null, username: null };
    case "clear_error_message":
      return { ...state, errorMessage: null };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "forgot_password":
      return { ...state, successMessage: action.payload };
    case "user_info":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

/**
 * if a token and a username exists, it adds it to the context
 * @param {*} dispatch 
 */
const tryLocalSignin = (dispatch) => () => {
  const token = localStorage.getItem("token"); //we get the token from the cache
  const username = localStorage.getItem("username");
  if (token && username) {
    dispatch({ type: "signin", payload: {token : token, username : username} });
    strapiApi.defaults.headers.common['Authorization'] = "Bearer " + token; //defines a default value of Authorization in the header to join the token with every request sent to Strapi
    strapiApi.interceptors.response.use(function (response) {
      return response;
    }, 
    function (error) {
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("username"); 
        delete strapiApi.defaults.headers.common['Authorization']; //removes the token from the default headers.
        dispatch({ type: "signout" });
      }

      return error;
  });
  }
};

/**
 * Removes error message from the context
 * @param {*} dispatch 
 */
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

/**
 * authenticates the user on Strapi with an email and a password.
 * If the authentification is successful, it adds an authentification token.
 * If the authentification is not successful, it adds an error to the context.
 * @param {*} dispatch 
 */
const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      if (!email || !password) {
        return;
      }
      const response = await strapiApi.post("/auth/local", { //may throw an exception
        identifier: email,
        password,
      });
      localStorage.setItem("token", response.data.jwt); //saves the auth token in the cache
      localStorage.setItem("username", response.data.user.username); //saves the username in the cache to use it in the tryLocalSignin fct
      dispatch({ type: "signin", payload: {token : response.data.jwt, username : response.data.user.username} });
      strapiApi.defaults.headers.common['Authorization'] = "Bearer " + response.data.jwt; //defines a default value of Authorization in the header to join the token with every request sent to Strapi
      
      strapiApi.interceptors.response.use(function (response) {
          return response;
        }, 
        function (error) {
          if(error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("username"); 
            delete strapiApi.defaults.headers.common['Authorization']; //removes the token from the default headers.
            dispatch({ type: "signout" });
          }

          return error;
      });

    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Problème de connexion",
      });
    }
  };

  /**
   * removes the authentification token and the username from the context and from the cache.
   * @param {*} dispatch 
   */
const signout = (dispatch) => () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  dispatch({ type: "signout" });
  delete strapiApi.defaults.headers.common['Authorization']; //removes the token from the default headers.
};

/**
 * sends a reset password request to Strapi.
 * If the request is successful, it adds a message to the context.
 * If the request failed, it adds an error to the context.
 * @param {*} dispatch 
 */
const forgotPassword =
  (dispatch) =>
  async ({ email }) => {
    try {
      if (!email) {
        return;
      }
      await strapiApi.post("/auth/forgot-password", {
        email,
      });
      dispatch({
        type: "forgot_password",
        payload: "Un email vous a été envoyé",
      });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Problème de reset",
      });
    }
  };

  /**
   * gets information related to the user connected to the app.
   * @param {*} dispatch 
   */
  const getUserInfo =
    (dispatch) =>
    async () => {
      try {
      let userInfo = await strapiApi.get("/users/me");
      dispatch({
        type: "user_info",
        payload: userInfo.data,
      });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Impossible de récupérer vos données personnelles.",
      });
    }
  };

  /**
   * create and export the context Authcontext and its provider 
   */
export const { Context, Provider } = createDataContext(
  AuthReducer,
  { signin, signout, clearErrorMessage, tryLocalSignin, forgotPassword, getUserInfo },
  {
    token: null,
    errorMessage: null,
    successMessage: null,
    username: null,
    userInfo: null,
  }
);
