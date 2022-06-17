// BASE

// export const BASE_URL = "http://compteheure.ineat.ca:1337";
// export const BASE_URL = "https://strapi.compte-heure.ineat.ca";    // PROD env
export const BASE_URL = "http://localhost:1337";

export const REGEX = {
  VALID_EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
};

// PROJECTS
export const PROJECT_TYPE = {
  FORFAIT: "forfait",
  SUPPORT: "support",
};
// software === forfait
// service_desk === support
export const PROJECT_TYPE_API = {
  SERVICE_DESK: "service_desk",
  SOFTWARE: "software",
};

export const PROJECT_CATEGORY = {
  Montreal_Consulting: "Montreal - Consulting",
  Montreal_Internal: "Montreal - Internal",
  Montreal_Presales: "Montreal - Presales",
  Montreal_Projects: "Montreal - Projects",
  Montreal_Support: "Montreal - Support",
};