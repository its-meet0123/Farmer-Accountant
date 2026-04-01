import { axiosInstance } from "./axiosIntance";

export async function getAllEntData() {
  return await axiosInstance.get(`/int`);
}

export async function postEntData(entData) {
  return await axiosInstance.post(`/int`, entData);
}

export async function getEntDataById(id) {
  return await axiosInstance.get(`/int/${id}`);
}

export async function updateEntData(id, entData) {
  return await axiosInstance.patch(`/int/${id}`, entData);
}

export async function deleteEntDataById(id) {
  return await axiosInstance.delete(`/int/${id}`);
}
