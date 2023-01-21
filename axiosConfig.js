import axios from "axios";
import { store } from "./redux/store";
import { setLogin, logout } from "./redux/slices/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = baseURL;

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
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
    const originalRequest = error?.config;
    if (error?.response?.status === 401 && !originalRequest.sent) {
      console.log("yes the response is", error.response.status);
      originalRequest.sent = true;
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      console.log("hey I am here", response);
      if (response.status === 200) {
        console.log("hey I am successful here");
        store.dispatch(setLogin({ user: response.data.user }));
        return axiosInstance(originalRequest);
      } else {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);
