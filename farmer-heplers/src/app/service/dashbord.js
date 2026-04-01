import { axiosInstance } from "./axiosIntance";

export async function getDashbordData() {
  return await axiosInstance.get(`/dashbord`);
}
