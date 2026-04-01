import { apiClient, axiosInstance } from "./axiosIntance";

export async function postUserDataForSignUp(user) {
  return await axiosInstance.post(`/user/signup`, user);
}

export async function postUserDataForLoggedIn(user) {
  return await axiosInstance.post(`/user/login`, user);
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
  //return await axios.post(`/user`, user);
}

export async function changeUserPassword(passwords) {
  return await apiClient.post(`/user/update-password`, passwords);
  // return await axios.post(`/user/update-password`, passwords);
}

export async function deleteUserAccount(user) {
  return await apiClient.post(`/user/delete-account`, user);
  //return await axios.post(`/user/delete-account`, user);
}
