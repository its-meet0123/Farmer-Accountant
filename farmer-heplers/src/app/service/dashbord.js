import { axiosInstance } from "./axiosIntance";

export async function getDashbordData(sessionId) {
  return await axiosInstance.get(`/dashbord/${sessionId}`);
}

export async function getMonthlyTurnover(sessionId) {
  return await axiosInstance.get(`/dashbord/monthly-turnover/${sessionId}`);
}
