import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function getDashbordData() {
  return await axios.get(`${API}/dashbord`, {
    withCredentials: true,
  });
}
