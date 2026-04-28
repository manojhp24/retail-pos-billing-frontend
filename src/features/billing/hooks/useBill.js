import { useState, useEffect, useRef } from "react";
import { getBillByIdAPi } from "../services/billingApi";
import { toast } from "react-toastify";

export const useBill = (id) => {
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBill = async () => {
    try {
      setLoading(true);
      const res = await getBillByIdAPi(id);
      setBill(res.data);
      console.log(bill);
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
    if (!id) return;
    fetchBill();
  }, [id]);

  return {
    bill,
    loading,
  };
};
