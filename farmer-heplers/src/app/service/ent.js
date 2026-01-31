import axios from "axios";

export async function getAllEntData() {
  return await axios.get("/api/int", {
    withCredentials: true,
  });
}

export async function postEntData(entData) {
  return await axios.post("/api/int", entData, {
    withCredentials: true,
  });
}

export async function getEntDataById(id) {
  return await axios.get(`/api/int/${id}`, {
    withCredentials: true,
  });
}

export async function updateEntData(id, entData) {
  return await axios.patch(`/api/int/${id}`, entData, {
    withCredentials: true,
  });
}

export async function deleteEntDataById(id) {
  return await axios.delete(`/api/int/${id}`, {
    withCredentials: true,
  });
}
