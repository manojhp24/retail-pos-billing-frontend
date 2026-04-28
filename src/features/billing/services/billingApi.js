import API from "@/lib/axios";

export const createBillApi = (data) => API.post("api/billing/create", data);
export const getBillByIdAPi = (id) => API.get(`api/billing/${id}`);
