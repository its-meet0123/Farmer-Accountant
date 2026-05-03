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

export async function deleteFieldWorkerData(id) {
  return await axiosInstance.delete(`/other/labor/${id}`);
}

export async function deleteHarvestData(id) {
  return await axiosInstance.delete(`/other/harvester/${id}`);
}

export async function updateFieldWorkerData(id, updateLaborDetails) {
  return await axiosInstance.patch(`/other/labor/${id}`, updateLaborDetails);
}

export async function updateHarvestData(id, updateHarvestData) {
  return await axiosInstance.patch(`/other/harvester/${id}`, updateHarvestData);
}

export async function addTransactionForFieldWorker(id, transaction) {
  return await axiosInstance.put(`/other/labor/${id}/transaction`, transaction);
}

export async function addTransactionForHarvestData(id, harvestTransaction) {
  return await axiosInstance.put(`/other/harvester/${id}`, harvestTransaction);
}

export async function deleteFieldWorkerTransaction(ids) {
  const { workerId, transactionId } = ids;
  return await axiosInstance.delete(
    `/other/labor/${workerId}/transaction/${transactionId}`,
  );
}

export async function deleteHarvestDataTransaction(ids) {
  const { harvestId, transactionId } = ids;
  return await axiosInstance.delete(
    `/other/harvester/${harvestId}/transaction/${transactionId}`,
  );
}

export async function updateFieldWorkerTransaction(ids, updatedTransaction) {
  const { workerId, transactionId } = ids;
  return await axiosInstance.patch(
    `/other/labor/${workerId}/transaction/${transactionId}`,
    updatedTransaction,
  );
}

export async function updateHarvestDataTransaction(ids, updatedTransaction) {
  //console.log("update harvest data transaction api called with ids: ", ids);
  const { harvesterId, transactionId } = ids;
  return await axiosInstance.patch(
    `/other/harvester/${harvesterId}/transaction/${transactionId}`,
    updatedTransaction,
  );
}
