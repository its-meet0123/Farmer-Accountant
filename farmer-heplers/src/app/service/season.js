import { axiosInstance } from "./axiosIntance";

export async function postSeason(seasonInfo) {
  return await axiosInstance.post(`/season`, seasonInfo);
}

export async function getAllSeason() {
  return await axiosInstance.get(`/season`);
}

export async function getSeasonById(sessionId) {
  return await axiosInstance.get(`/season/${sessionId}`);
}

export async function getActiveSeason() {
  return await axiosInstance.get(`/season/active-session`);
}

export async function deleteSeason(sessionId) {
  return await axiosInstance.delete(`/season/${sessionId}`);
}
