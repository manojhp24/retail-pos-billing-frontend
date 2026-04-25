import { useState, useEffect, useRef } from "react";
import { getAllCustomers, getCustomerBills } from "../services/customerApi";
import { toast } from "react-toastify";

export const useCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [customerBills, setCustomerBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await getAllCustomers();
      setCustomers(res.data);
    } catch (error) {
      const message =
        error.response?.data.message ||
        error.response?.data.Message ||
        error.response?.data.error ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
  };
};
