import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function addWorker(workerInfo) {
  return await axios.post(`${API}/worker`, workerInfo, {
    withCredentials: true,
  });
}

export async function getAllWorkers() {
  return await axios.get(`${API}/worker`, {
    withCredentials: true,
  });
}

export async function getWorkerById(id) {
  return await axios.get(`${API}/worker/${id}`, {
    withCredentials: true,
  });
}

export async function updateWorkerById(id, workerInfo) {
  return await axios.patch(`${API}/worker/${id}`, workerInfo, {
    withCredentials: true,
  });
}

export async function deleteWorkerById(id) {
  return await axios.delete(`${API}/worker/${id}`, {
    withCredentials: true,
  });
}

export async function addWorkerTransactionById(id, workerTransaction) {
  return await axios.put(`${API}/worker/${id}/push`, workerTransaction, {
    withCredentials: true,
  });
}

export async function updateWorkerTransactionById(ids, updatedTransaction) {
  const workerId = ids?.workerId;
  const accountId = ids?.accountId;
  if (workerId && accountId)
    return await axios.patch(
      `${API}/worker/${workerId}/account/${accountId}`,
      updatedTransaction,
      {
        withCredentials: true,
      },
    );
}

export async function getWorkerTransaction(workerId) {
  console.log(workerId);
  return await axios.get(`${API}/worker/${workerId}/account`, {
    withCredentials: true,
  });
}

export async function deleteWorkerTransactionById(workerId, accountIds) {
  return await axios.post(`${API}/worker/${workerId}/delete`, accountIds, {
    withCredentials: true,
  });
}
