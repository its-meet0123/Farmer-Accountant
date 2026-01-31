import axios from "axios";

export async function postUserDataForSignUp(user) {
  return await axios.post(`/api/user/signup`, user, {
    withCredentials: true,
  });
}

export async function postUserDataForLoggedIn(user) {
  return await axios.post(`/api/user/login`, user, {
    withCredentials: true,
  });
}

export async function userLoggedOut() {
  return await axios.post(`/api/user/logout`);
}

export async function getUserData(user) {
  return await axios.post(`/api/user`, user);
}

export async function changeUserPassword(passwords) {
  return await axios.post("/api/user/update-password", passwords);
}

export async function deleteUserAccount(user) {
  return await axios.post("/api/user/delete-account", user);
}
