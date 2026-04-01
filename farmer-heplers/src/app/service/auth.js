import { apiClient, axiosInstance } from "./axiosIntance";
const API = import.meta.env.VITE_API_URL;

export async function postUserDataForSignUp(user) {
  return await axiosInstance.post(`${API}/user/signup`, user);
}

export async function postUserDataForLoggedIn(user) {
  try {
    return await axiosInstance.post(`${API}/user/login`, user);
  } catch (err) {
    console.error("Login Error: ", err.message);
    throw err;
  }
}

export async function userLoggedOut() {
  return await axiosInstance.post(`/user/logout`, {});
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
