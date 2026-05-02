import { axiosInstance } from "./axiosIntance";

export async function getAllEntData() {
  return await axiosInstance.get(`/int`);
}

export async function postEntData(entData) {
  return await axiosInstance.post(`/int`, entData);
}

export async function getEntDataById(sessionId, id) {
  return await axiosInstance.get(`/int/${sessionId}/${id}`);
}

export async function updateEntData(ids, entData) {
  const { sessionId, id } = ids;
  return await axiosInstance.patch(`/int/${sessionId}/${id}`, entData);
}

export async function deleteEntDataById(sessionId, id) {
  return await axiosInstance.delete(`/int/${sessionId}/${id}`);
}
