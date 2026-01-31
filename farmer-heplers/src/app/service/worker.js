import axios from "axios";

export async function addWorker(workerInfo) {
  return await axios.post(`/api/worker`, workerInfo, {
    withCredentials: true,
  });
}

export async function getAllWorkers() {
  return await axios.get("/api/worker", {
    withCredentials: true,
  });
}

export async function getWorkerById(id) {
  return await axios.get(`/api/worker/${id}`, {
    withCredentials: true,
  });
}

export async function updateWorkerById(id, workerInfo) {
  return await axios.patch(`/api/worker/${id}`, workerInfo, {
    withCredentials: true,
  });
}

export async function deleteWorkerById(id) {
  return await axios.delete(`/api/worker/${id}`, {
    withCredentials: true,
  });
}

export async function addWorkerTransactionById(id, workerTransaction) {
  return await axios.put(`/api/worker/${id}/push`, workerTransaction, {
    withCredentials: true,
  });
}

export async function updateWorkerTransactionById(ids, updatedTransaction) {
  const workerId = ids?.workerId;
  const accountId = ids?.accountId;
  if (workerId && accountId)
    return await axios.patch(
      `/api/worker/${workerId}/account/${accountId}`,
      updatedTransaction,
      {
        withCredentials: true,
      },
    );
}

export async function getWorkerTransaction(workerId) {
  console.log(workerId);
  return await axios.get(`/api/worker/${workerId}/account`, {
    withCredentials: true,
  });
}

export async function deleteWorkerTransactionById(workerId, accountIds) {
  return await axios.post(`/api/worker/${workerId}/delete`, accountIds, {
    withCredentials: true,
  });
}
