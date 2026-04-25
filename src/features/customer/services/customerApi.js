import API from "@/lib/axios";

export const getAllCustomers = () => API.get("/api/customer");
export const getCustomerBills = (customerId) =>
  API.get(`/api/customer/${customerId}/bills`);
