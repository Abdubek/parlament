import axios from "axios";
import { AuthLogin } from "./generated/auth/authAPI";

export const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const authResponse = await AuthLogin({
          username: "Omar",
          password: "!QAZxsw23edc",
        });

        const { accessToken } = authResponse;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return api(originalRequest);
        }
      } catch (loginError) {
        return Promise.reject(loginError);
      }
    }

    return Promise.reject(error);
  },
);
