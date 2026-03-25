import axios from "axios";
import { handleApiError } from "@/utils/errorHandler";

const API = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = handleApiError(error);

    return Promise.reject({
      ...error,
      customMessage: message,
    });
  },
);

export default API;
