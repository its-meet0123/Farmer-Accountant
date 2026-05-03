import { axiosInstance } from "./axiosIntance";

export async function addWorker(workerInfo) {
  return await axiosInstance.post(`/worker`, workerInfo);
}

export async function getAllWorkers(sessionId) {
  return await axiosInstance.get(`/worker/${sessionId}`);
}

export async function getWorkerById(id) {
  return await axiosInstance.get(`/worker/${id}`);
}

export async function updateWorkerById(id, workerInfo) {
  return await axiosInstance.patch(`/worker/${id}`, workerInfo);
}

export async function deleteWorkerById(id) {
  return await axiosInstance.delete(`/worker/${id}`);
}

export async function addWorkerTransactionById(id, workerTransaction) {
  return await axiosInstance.put(`/worker/${id}/push`, workerTransaction);
}

export async function updateWorkerTransactionById(ids, updatedTransaction) {
  const { workerId, accountId } = ids;
  if (workerId && accountId)
    return await axiosInstance.patch(
      `/worker/${workerId}/account/${accountId}`,
      updatedTransaction,
    );
}

export async function getWorkerTransaction(workerId) {
  return await axiosInstance.get(`/worker/${workerId}/account`);
}

export async function deleteWorkerTransactionById(workerId, accountIds) {
  return await axiosInstance.post(`/worker/${workerId}/delete`, accountIds);
}
