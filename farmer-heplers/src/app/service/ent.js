import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function getAllEntData() {
  return await axios.get(`${API}/int`, {
    withCredentials: true,
  });
}

export async function postEntData(entData) {
  return await axios.post(`${API}/int`, entData, {
    withCredentials: true,
  });
}

export async function getEntDataById(id) {
  return await axios.get(`${API}/int/${id}`, {
    withCredentials: true,
  });
}

export async function updateEntData(id, entData) {
  return await axios.patch(`${API}/int/${id}`, entData, {
    withCredentials: true,
  });
}

export async function deleteEntDataById(id) {
  return await axios.delete(`${API}/int/${id}`, {
    withCredentials: true,
  });
}
