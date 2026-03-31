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

export async function postUserDataForSignUp(user) {
  return await axios.post(`${API}/user/signup`, user, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function postUserDataForLoggedIn(user) {
  return await axios.post(`${API}/user/login`, user, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function userLoggedOut() {
  return await axios.post(
    `${API}/user/logout`,
    {},
    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      withCredentials: true,
    },
  );
}

export async function getUserData(user) {
  try {
    const url = `/user?t=${new Date().getTime()}`;
    return await apiClient.post(url, user);
  } catch (error) {
    console.error("Iphone fetch Error: ", error.message);
    throw error;
  }
  //return await axios.post(`${API}/user`, user);
}

export async function changeUserPassword(passwords) {
  return await apiClient.post(`/user/update-password`, passwords);
  // return await axios.post(`${API}/user/update-password`, passwords);
}

export async function deleteUserAccount(user) {
  return await apiClient.post(`/user/delete-account`, user);
  //return await axios.post(`${API}/user/delete-account`, user);
}
