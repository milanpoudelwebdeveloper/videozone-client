import axios from "axios";
import { store } from "./redux/store";
import { login } from "./redux/slices/user";

const baseURL = "http://localhost:8000/api";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("there is an error");
    console.log(error);
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axios.get("/api/auth/refresh", {
        withCredentials: true,
      });
      store.dispatch(
        login({
          token: response.data.accessToken,
          user: response.data.user,
        })
      );
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
