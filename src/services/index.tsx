import axios, { Method } from "axios";
import queryString from "query-string";
import { LocalhostStorage } from "../utils/LocalStorage";
const axiosClient = axios.create({
  // withCredentials: true,
  baseURL: "http://localhost:3333",
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    // Cookies: `jwt=${LocalhostStorage.get("jwt")}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => {
    const jwt = LocalhostStorage.get("jwt");
    if (jwt) {
      config.headers = {
        auth: `${jwt}`,
      };
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
