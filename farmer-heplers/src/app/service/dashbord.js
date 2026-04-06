import { axiosInstance } from "./axiosIntance";

export async function getDashbordData() {
  return await axiosInstance.get(`/dashbord`);
}

export async function getMonthlyTurnover() {
  return await axiosInstance.get(`/dashbord/monthly-turnover`);
}
