import API from "@/lib/axios";

export const getAllInventory = () => API.get("/api/inventory");
export const restockInventory = (id, quantity) =>
  API.put(`/api/inventory/restock/${id}?quantity=${quantity}`);
export const reduceInventory = (id, quantity) =>
  API.put(`/api/inventory/reduce/${id}?quantity=${quantity}`);
