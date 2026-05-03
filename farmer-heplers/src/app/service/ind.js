import { axiosInstance } from "./axiosIntance";

export async function postIntShopeInitailData(shopeData) {
  return await axiosInstance.post(`/intshope`, shopeData);
}

export async function getAllIndShopes(sessionId) {
  return await axiosInstance.get(`/intshope/${sessionId}`);
}

export async function getIndShopeAccountById(id) {
  return await axiosInstance.get(`/intshope/${id}`);
}

export async function UpdateIndDataById(Id, indDatas) {
  return await axiosInstance.patch(`/intshope/${Id}`, indDatas);
}

export async function deleteIndDataByIds(ids) {
  return await axiosInstance.post(`/intshope/delete-many`, ids);
}

export async function deleteIndShopeAccountData(shopeId, transactionIds) {
  return await axiosInstance.patch(
    `/intshope/${shopeId}/delete-many`,
    transactionIds,
  );
}

export async function pushIndShopeAccountById(id, transaction) {
  return await axiosInstance.put(`/intshope/${id}`, transaction);
}

export async function updateIndShopeAccount(IDs, transaction) {
  const { shopeId, accountId } = IDs;
  return await axiosInstance.put(
    `/intshope/${shopeId}/account/${accountId}`,
    transaction,
  );
}

export async function postEndDate(date) {
  return await axiosInstance.post(`/intdate`, date);
}

export async function getEndDate(sessionId) {
  return await axiosInstance.get(`/intdate/${sessionId}`);
}

export async function editEndDate(ids, date) {
  const { sessionId, id } = ids;
  return await axiosInstance.patch(`/intdate/${sessionId}/${id}`, date);
}

export async function deleteEndDate(sessionId, id) {
  return await axiosInstance.delete(`/intdate/${sessionId}/${id}`);
}
