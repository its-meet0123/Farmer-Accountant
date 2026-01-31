import axios from "axios";

export async function postIntShopeInitailData(shopeData) {
  return await axios.post(`/api/intshope`, shopeData, {
    withCredentials: true,
  });
}

export async function getAllIndShopes() {
  return await axios.get("/api/intshope", {
    withCredentials: true,
  });
}

export async function getIndShopeAccountById(id) {
  return await axios.get(`/api/intshope/${id}`);
}

export async function UpdateIndDataById(Id, indDatas) {
  return await axios.patch(`/api/intshope/${Id}`, indDatas, {
    withCredentials: true,
  });
}

export async function deleteIndDataByIds(ids) {
  return await axios.post(`/api/intshope/delete-many`, ids, {
    withCredentials: true,
  });
}

export async function deleteIndShopeAccountData(ids) {
  return await axios.patch(
    `/api/intshope/${ids.shopeId}/delete-many`,
    ids.transactionIds,
    {
      withCredentials: true,
    },
  );
}

export async function pushIndShopeAccountById(id, transaction) {
  return await axios.put(`/api/intshope/${id}`, transaction, {
    withCredentials: true,
  });
}

export async function updateIndShopeAccount(shopeId, accountId, transaction) {
  return await axios.put(
    `/api/intshope/${shopeId}/account/${accountId}`,
    transaction,
    {
      withCredentials: true,
    },
  );
}

export async function postEndDate(date) {
  return await axios.post(`/api/intdate`, date, {
    withCredentials: true,
  });
}

export async function getEndDate() {
  return await axios.get("/api/intdate", {
    withCredentials: true,
  });
}

export async function editEndDate(id, date) {
  return await axios.patch(`/api/intdate/${id}`, date, {
    withCredentials: true,
  });
}

export async function deleteEndDate(id) {
  return await axios.delete(`/api/intdate/${id}`, {
    withCredentials: true,
  });
}
