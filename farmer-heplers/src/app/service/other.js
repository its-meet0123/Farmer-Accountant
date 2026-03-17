import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function getAllFieldWorkerData() {
  return await axios.get(`${API}/other/labor`, {
    withCredentials: true,
  });
}

export async function postFieldWorkerData(laborDetails) {
  return await axios.post(`${API}/other/labor`, laborDetails, {
    withCredentials: true,
  });
}

export async function deleteFieldWorkerData(id) {
  return await axios.delete(`${API}/other/labor/${id}`, {
    withCredentials: true,
  });
}

export async function updateFieldWorkerData(id, updateWorker) {
  return await axios.patch(`${API}/other/labor/${id}`, updateWorker, {
    withCredentials: true,
  });
}

export async function addTransactionForFieldWorker(id, transaction) {
  return await axios.put(`${API}/other/labor/${id}/transaction`, transaction, {
    withCredentials: true,
  });
}

export async function deleteFieldWorkerTransaction(ids) {
  return await axios.put(
    `${API}/other/labor/${ids.workerId}/transaction/${ids.transactionId}`,
    {
      withCredentials: true,
    },
  );
}

export async function updateFieldWorkerTransaction(ids, updatedTransaction) {
  return await axios.patch(
    `${API}/other/labor/${ids.workerId}/transaction/${ids.transactionId}`,
    updatedTransaction,
    {
      withCredentials: true,
    },
  );
}
