import API from "@/lib/axios";

export const getAllProducts = () => API.get("/api/products");
export const createProducts = (data) => API.post("/api/products", data);
export const deleteProductApi = (id) => API.delete(`/api/products/${id}`);
export const updateProductsApi = (id, data) => {
  API.put(`/api/products/${id}`, data);
};
