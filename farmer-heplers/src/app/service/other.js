import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function getAllFieldWorkerData() {
  return await axios.get(`${API}/other/labor`, {
    withCredentials: true,
  });
}

export async function getAllHarvestList() {
  return await axios.get(`${API}/other/harvester`, {
    withCredentials: true,
  });
}

export async function postFieldWorkerData(laborDetails) {
  return await axios.post(`${API}/other/labor`, laborDetails, {
    withCredentials: true,
  });
}

export async function postHarvestData(harvestDetails) {
  return await axios.post(`${API}/other/harvester`, harvestDetails, {
    withCredentials: true,
  });
}

export async function deleteFieldWorkerData(id) {
  return await axios.delete(`${API}/other/labor/${id}`, {
    withCredentials: true,
  });
}

export async function deleteHarvestData(id) {
  return await axios.delete(`${API}/other/harvester/${id}`, {
    withCredentials: true,
  });
}

export async function updateFieldWorkerData(id, updateLaborDetails) {
  return await axios.patch(`${API}/other/labor/${id}`, updateLaborDetails, {
    withCredentials: true,
  });
}

export async function updateHarvestData(id, updateHarvestData) {
  return await axios.patch(`${API}/other/harvester/${id}`, updateHarvestData, {
    withCredentials: true,
  });
}

export async function addTransactionForFieldWorker(id, transaction) {
  return await axios.put(`${API}/other/labor/${id}/transaction`, transaction, {
    withCredentials: true,
  });
}

export async function addTransactionForHarvestData(id, harvestTransaction) {
  return await axios.put(`${API}/other/harvester/${id}`, harvestTransaction, {
    withCredentials: true,
  });
}

export async function deleteFieldWorkerTransaction(ids) {
  const { workerId, transactionId } = ids;
  return await axios.delete(
    `${API}/other/labor/${workerId}/transaction/${transactionId}`,
    {
      withCredentials: true,
    },
  );
}

export async function deleteHarvestDataTransaction(ids) {
  const { harvestId, transactionId } = ids;
  return await axios.delete(
    `${API}/other/harvester/${harvestId}/transaction/${transactionId}`,
    {
      withCredentials: true,
    },
  );
}

export async function updateFieldWorkerTransaction(ids, updatedTransaction) {
  const { workerId, transactionId } = ids;
  return await axios.patch(
    `${API}/other/labor/${workerId}/transaction/${transactionId}`,
    updatedTransaction,
    {
      withCredentials: true,
    },
  );
}

export async function updateHarvestDataTransaction(ids, updatedTransaction) {
  const { harvestId, transactionId } = ids;

  return await axios.patch(
    `${API}/other/harvester/${harvestId}/transaction/${transactionId}`,
    updatedTransaction,
    {
      withCredentials: true,
    },
  );
}
