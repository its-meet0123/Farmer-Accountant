import { axiosInstance } from "./axiosIntance";

export async function getAllFieldWorkerData(sessionId) {
  return await axiosInstance.get(`/other/${sessionId}/labor`);
}

export async function getAllHarvestList(sessionId) {
  return await axiosInstance.get(`/other/${sessionId}/harvester`);
}

export async function postFieldWorkerData(laborDetails) {
  return await axiosInstance.post(`/other/labor`, laborDetails);
}

export async function postHarvestData(harvestDetails) {
  return await axiosInstance.post(`/other/harvester`, harvestDetails);
}

export async function deleteFieldWorkerData(sessionId, id) {
  return await axiosInstance.delete(`/other/${sessionId}/labor/${id}`);
}

export async function deleteHarvestData(sessionId, id) {
  return await axiosInstance.delete(`/other/${sessionId}/harvester/${id}`);
}

export async function updateFieldWorkerData(ids, updateLaborDetails) {
  const { sessionId, id } = ids;
  return await axiosInstance.patch(
    `/other/${sessionId}/labor/${id}`,
    updateLaborDetails,
  );
}

export async function updateHarvestData(ids, updateHarvestData) {
  const { sessionId, id } = ids;
  return await axiosInstance.patch(
    `/other/${sessionId}/harvester/${id}`,
    updateHarvestData,
  );
}

export async function addTransactionForFieldWorker(ids, transaction) {
  const { sessionId, id } = ids;
  return await axiosInstance.put(
    `/other/${sessionId}/labor/${id}/transaction`,
    transaction,
  );
}

export async function addTransactionForHarvestData(ids, harvestTransaction) {
  const { sessionId, id } = ids;
  return await axiosInstance.put(
    `/other/${sessionId}/harvester/${id}`,
    harvestTransaction,
  );
}

export async function deleteFieldWorkerTransaction(ids) {
  const { sessionId, workerId, transactionId } = ids;
  return await axiosInstance.delete(
    `/other/${sessionId}/labor/${workerId}/transaction/${transactionId}`,
  );
}

export async function deleteHarvestDataTransaction(ids) {
  const { sessionId, harvestId, transactionId } = ids;
  return await axiosInstance.delete(
    `/other/${sessionId}/harvester/${harvestId}/transaction/${transactionId}`,
  );
}

export async function updateFieldWorkerTransaction(ids, updatedTransaction) {
  const { sessionId, workerId, transactionId } = ids;
  return await axiosInstance.patch(
    `/other/${sessionId}/labor/${workerId}/transaction/${transactionId}`,
    updatedTransaction,
  );
}

export async function updateHarvestDataTransaction(ids, updatedTransaction) {
  //console.log("update harvest data transaction api called with ids: ", ids);
  const { sessionId, harvesterId, transactionId } = ids;
  return await axiosInstance.patch(
    `/other/${sessionId}/harvester/${harvesterId}/transaction/${transactionId}`,
    updatedTransaction,
  );
}
