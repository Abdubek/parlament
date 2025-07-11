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

// Automatically authenticate and retry requests on 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite retry loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Perform login with default credentials
        const authResponse = await AuthLogin({
          username: "Omar",
          password: "!QAZxsw23edc",
        });

        const { accessToken } = authResponse;

        if (accessToken) {
          // Store the new token
          localStorage.setItem("accessToken", accessToken);

          // Update the authorization header for the retried request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (loginError) {
        // If re-authentication fails, reject with the original error
        return Promise.reject(loginError);
      }
    }

    return Promise.reject(error);
  },
);
