import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: API,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request sent : ", config);

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Received :", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    let isRedirecting = false;

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/user/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await refreshClient.post(
          `/user/refresh-token?t=${Date.now()}`,
          {},
          { withCredentials: true },
        );

        const newToken = res.data.accessToken;

        if (!newToken) {
          throw new Error("No new token received");
        }

        localStorage.setItem("token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");
        if (!isRedirecting) {
          isRedirecting = true;
          // window.location.href = "https://farmer-accoutant.onrender.com/login";
        }

        console.error("Token refresh failed: ", err.message);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

const apiClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

export { axiosInstance, apiClient };
