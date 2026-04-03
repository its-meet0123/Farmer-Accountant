import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

const refreshClient = axios.create({
  baseURL: API,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await refreshClient.post(`/auth/refresh-token`, {});

        const newToken = res.data.accessToken;

        if (!newToken) {
          throw new Error("No new token received");
        }

        localStorage.setItem("token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");

        //window.location.href = "https://farmer-accoutant.onrender.com/login";

        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export { axiosInstance, apiClient };
