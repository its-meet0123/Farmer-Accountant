import { axiosInstance } from "./axiosIntance";

export async function addWorker(workerInfo) {
  return await axiosInstance.post(`/worker`, workerInfo);
}

export async function getAllWorkers(sessionId) {
  return await axiosInstance.get(`/worker/${sessionId}`);
}

export async function getWorkerById(sessionId, id) {
  return await axiosInstance.get(`/worker/${sessionId}/${id}`);
}

export async function updateWorkerById(ids, workerInfo) {
  const { sessionId, id } = ids;
  return await axiosInstance.patch(`/worker/${sessionId}/${id}`, workerInfo);
}

export async function deleteWorkerById(sessionId, id) {
  return await axiosInstance.delete(`/worker/${sessionId}/${id}`);
}

export async function addWorkerTransactionById(ids, workerTransaction) {
  const { sessionId, id } = ids;
  return await axiosInstance.put(
    `/worker/${sessionId}/${id}/push`,
    workerTransaction,
  );
}

export async function updateWorkerTransactionById(ids, updatedTransaction) {
  const { sessionId, workerId, accountId } = ids;
  if (sessionId && workerId && accountId)
    return await axiosInstance.patch(
      `/worker/${sessionId}/${workerId}/account/${accountId}`,
      updatedTransaction,
    );
}

export async function getWorkerTransaction(sessionId, workerId) {
  return await axiosInstance.get(`/worker/${sessionId}/${workerId}/account`);
}

export async function deleteWorkerTransactionById(IDs) {
  const { sessionId, workerId, accountIds } = IDs;
  return await axiosInstance.post(
    `/worker/${sessionId}/${workerId}/delete`,
    accountIds,
  );
}
