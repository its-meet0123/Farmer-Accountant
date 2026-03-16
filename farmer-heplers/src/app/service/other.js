import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function getAllFieldWorkerData() {
  return await axios.get(`${API}/other`, {
    withCredentials: true,
  });
}
