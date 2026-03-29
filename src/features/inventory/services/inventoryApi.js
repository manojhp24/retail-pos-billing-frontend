import API from "@/lib/axios";

export const getAllInventory = () => API.get("/api/inventory");
export const createInventory = (data) => API.post("/api/inventory", data);
export const updateInventory = (id, data) => API.put(`/api/inventory/${id}`, data);
export const deleteInventory = (id) => API.delete(`/api/inventory/${id}`);