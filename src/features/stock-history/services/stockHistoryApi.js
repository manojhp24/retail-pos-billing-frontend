import API from "@/lib/axios";

export const getAllStockHistoryById = (id) =>
  API.get(`/inventory/history/${id}`);
