import { axiosInstance } from "./axiosIntance";

export async function postIntShopeInitailData(shopeData) {
  return await axiosInstance.post(`/intshope`, shopeData);
}

export async function getAllIndShopes() {
  return await axiosInstance.get(`/intshope`);
}

export async function getIndShopeAccountById(sessionId, id) {
  return await axiosInstance.get(`/intshope/${sessionId}/${id}`);
}

export async function UpdateIndDataById(Ids, indDatas) {
  const { sessionId, Id } = Ids;
  return await axiosInstance.patch(`/intshope/${sessionId}/${Id}`, indDatas);
}

export async function deleteIndDataByIds(sessionId, ids) {
  return await axiosInstance.post(`/intshope/${sessionId}/delete-many`, ids);
}

export async function deleteIndShopeAccountData(ids) {
  return await axiosInstance.patch(
    `/intshope/${ids.sessionId}/${ids.shopeId}/delete-many`,
    ids.transactionIds,
  );
}

export async function pushIndShopeAccountById(ids, transaction) {
  const { sessionId, id } = ids;
  return await axiosInstance.put(`/intshope/${sessionId}/${id}`, transaction);
}

export async function updateIndShopeAccount(IDs, transaction) {
  const { sessionId, shopeId, accountId } = IDs;
  return await axiosInstance.put(
    `/intshope/${sessionId}/${shopeId}/account/${accountId}`,
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
