import axios from "axios";
import { endpoint } from "./apiEndpoints";

const api = axios.create({
  baseURL: `${endpoint.base}`,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log("axios interceptor", error);
    if (
      error.response &&
      error.response.status &&
      error?.response?.status > 400 &&
      error?.response?.status < 500
    ) {
      return Promise.reject(error?.response?.data);
    }
    if (error.toJSON().message === "Network Error") {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
