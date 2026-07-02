import { axiosInstance } from "./axiosIntance";

export async function calculateMarketTax(taxData) {
  return await axiosInstance.post(`/market-tax`, taxData);
}

export async function getMarketTax(sessionId, shopeId) {
  return await axiosInstance.get(`/market-tax/${sessionId}/${shopeId}`);
}

export async function updateMarketTax(Ids, taxData) {
  const { sessionId, shopeId, dataId } = Ids;
  return await axiosInstance.patch(
    `/market-tax/sessionId/${sessionId}shopeId/${shopeId}/dataId/${dataId}`,
    taxData,
  );
}
