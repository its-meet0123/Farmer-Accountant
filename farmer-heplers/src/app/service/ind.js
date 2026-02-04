import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function postIntShopeInitailData(shopeData) {
  return await axios.post(`${API}/intshope`, shopeData, {
    withCredentials: true,
  });
}

export async function getAllIndShopes() {
  return await axios.get(`${API}/intshope`, {
    withCredentials: true,
  });
}

export async function getIndShopeAccountById(id) {
  return await axios.get(`${API}/intshope/${id}`, {
    withCredentials: true,
  });
}

export async function UpdateIndDataById(Id, indDatas) {
  return await axios.patch(`${API}/intshope/${Id}`, indDatas, {
    withCredentials: true,
  });
}

export async function deleteIndDataByIds(ids) {
  return await axios.post(`${API}/intshope/delete-many`, ids, {
    withCredentials: true,
  });
}

export async function deleteIndShopeAccountData(ids) {
  return await axios.patch(
    `${API}/intshope/${ids.shopeId}/delete-many`,
    ids.transactionIds,
    {
      withCredentials: true,
    },
  );
}

export async function pushIndShopeAccountById(id, transaction) {
  return await axios.put(`${API}/intshope/${id}`, transaction, {
    withCredentials: true,
  });
}

export async function updateIndShopeAccount(shopeId, accountId, transaction) {
  return await axios.put(
    `${API}/intshope/${shopeId}/account/${accountId}`,
    transaction,
    {
      withCredentials: true,
    },
  );
}

export async function postEndDate(date) {
  return await axios.post(`${API}/intdate`, date, {
    withCredentials: true,
  });
}

export async function getEndDate() {
  return await axios.get(`${API}/intdate`, {
    withCredentials: true,
  });
}

export async function editEndDate(id, date) {
  return await axios.patch(`${API}/intdate/${id}`, date, {
    withCredentials: true,
  });
}

export async function deleteEndDate(id) {
  return await axios.delete(`${API}/intdate/${id}`, {
    withCredentials: true,
  });
}
