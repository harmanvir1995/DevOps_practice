import axios from "axios";
import { BASE_URL } from "../helpers/constants";

/**
 * creates http headers for axios instance
 * @returns the headers created
 */
const buildHeaders = () => {
  let headers = {
    "Content-Type": "application/json",
  };
  return headers;
};

/**
 * the axios instance used to communicate with Strapi
 */
export const strapiApi = axios.create({
  baseURL: BASE_URL,
  headers: buildHeaders(),
});

export default strapiApi;
