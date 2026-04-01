import { axiosInstance } from "./axiosIntance";

export async function postIntShopeInitailData(shopeData) {
  return await axiosInstance.post(`/intshope`, shopeData);
}

export async function getAllIndShopes() {
  return await axiosInstance.get(`/intshope`);
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

export async function deleteIndShopeAccountData(ids) {
  return await axiosInstance.patch(
    `/intshope/${ids.shopeId}/delete-many`,
    ids.transactionIds,
  );
}

export async function pushIndShopeAccountById(id, transaction) {
  return await axiosInstance.put(`/intshope/${id}`, transaction);
}

export async function updateIndShopeAccount(shopeId, accountId, transaction) {
  return await axiosInstance.put(
    `/intshope/${shopeId}/account/${accountId}`,
    transaction,
  );
}

export async function postEndDate(date) {
  return await axiosInstance.post(`/intdate`, date);
}

export async function getEndDate() {
  return await axiosInstance.get(`/intdate`);
}

export async function editEndDate(id, date) {
  return await axiosInstance.patch(`/intdate/${id}`, date);
}

export async function deleteEndDate(id) {
  return await axiosInstance.delete(`/intdate/${id}`);
}
