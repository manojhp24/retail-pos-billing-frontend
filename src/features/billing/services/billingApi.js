import API from "@/lib/axios";

export const createBillApi = (data) => API.post("api/billing/create", data);
