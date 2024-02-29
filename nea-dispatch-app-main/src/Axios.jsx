import axios from "axios";
import Cookies from "js-cookie";

// Get access token from cookies
const accessToken = Cookies.get("access_token");
// Get refresh token from cookies
const refreshToken = Cookies.get("refresh_token");
// const baseURL = '/api'
const baseURL = "http://localhost:4008/api";
// const baseURL = 'http://192.168.1.89:4007/api'
// const baseURL = 'http://192.168.1.100:4007/api'
// const baseURL = "http://localhost:4007/api";
// const baseURL = 'https://b47b-2400-1a00-b030-3a8e-1647-5220-9595-6b9e.ngrok-free.app/api'

// Create an Axios instance
const api = axios.create({
  baseURL: baseURL,
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken",
  // You can also configure other options here, such as headers
});

// Set authentication token in headers
if (accessToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

// Add a response interceptor to handle token refreshing
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid" &&
      !originalRequest._retry // Ensure that the request isn't being retried
    ) {
      try {
        // Request a new access token using the refresh token
        const refreshResponse = await axios.post(baseURL + "/token/refresh/", {
          refresh: refreshToken,
        });

        const newAccessToken = refreshResponse.data.access;

        // Update the access token in cookies
        Cookies.set("access_token", newAccessToken);

        // Update the access token in the Axios headers
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        originalRequest._retry = true; // Mark the request as being retried
        window.location.reload();
        return api(originalRequest);
      } catch (refreshError) {
        // Handle error refreshing token (e.g., logout user)
        console.error(refreshError);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
