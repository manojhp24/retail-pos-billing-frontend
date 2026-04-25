import { useState, useEffect, useRef } from "react";
import { getCustomerBills } from "../services/customerApi";
import { toast } from "react-toastify";

export const useCustomerBills = (customerId) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomerBills = async () => {
    try {
      setLoading(true);
      console.log("Customer ID:", customerId);
      const res = await getCustomerBills(customerId);
      console.log("API DATA:", res.data);
      setBills(res.data);
    } catch (error) {
      toast.error("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!customerId) return;
    fetchCustomerBills();
  }, [customerId]);

  return { bills, loading };
};
