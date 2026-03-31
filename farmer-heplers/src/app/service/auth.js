import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function postUserDataForSignUp(user) {
  return await axios.post(`${API}/user/signup`, user, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
    withCredentials: true,
  });
}

export async function postUserDataForLoggedIn(user) {
  return await axios.post(`${API}/user/login`, user, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
    withCredentials: true,
  });
}

export async function userLoggedOut() {
  return await axios.post(`${API}/user/logout`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
    withCredentials: true,
  });
}

export async function getUserData(user) {
  return await axios.post(`${API}/user`, user);
}

export async function changeUserPassword(passwords) {
  return await axios.post(`${API}/user/update-password`, passwords);
}

export async function deleteUserAccount(user) {
  return await axios.post(`${API}/user/delete-account`, user);
}
