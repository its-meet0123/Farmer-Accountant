import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function postIntShopeInitailData(shopeData) {
  return await axios.post(`${API}/intshope`, shopeData, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function getAllIndShopes() {
  return await axios.get(`${API}/intshope`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function getIndShopeAccountById(id) {
  return await axios.get(`${API}/intshope/${id}`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function UpdateIndDataById(Id, indDatas) {
  return await axios.patch(`${API}/intshope/${Id}`, indDatas, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function deleteIndDataByIds(ids) {
  return await axios.post(`${API}/intshope/delete-many`, ids, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function deleteIndShopeAccountData(ids) {
  return await axios.patch(
    `${API}/intshope/${ids.shopeId}/delete-many`,
    ids.transactionIds,
    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      withCredentials: true,
    },
  );
}

export async function pushIndShopeAccountById(id, transaction) {
  return await axios.put(`${API}/intshope/${id}`, transaction, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function updateIndShopeAccount(shopeId, accountId, transaction) {
  return await axios.put(
    `${API}/intshope/${shopeId}/account/${accountId}`,
    transaction,
    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      withCredentials: true,
    },
  );
}

export async function postEndDate(date) {
  return await axios.post(`${API}/intdate`, date, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function getEndDate() {
  return await axios.get(`${API}/intdate`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function editEndDate(id, date) {
  return await axios.patch(`${API}/intdate/${id}`, date, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}

export async function deleteEndDate(id) {
  return await axios.delete(`${API}/intdate/${id}`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    withCredentials: true,
  });
}
