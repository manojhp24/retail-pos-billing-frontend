import { useEffect, useRef, useState } from "react";
import { getAllStockHistoryById } from "../services/stockHistoryApi";
import { handleApiError } from "@/utils/errorHandler";
import { toast } from "react-toastify";

export const useStockHistory = () => {
  const [stockHistory, setStockHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockHistory = async (id) => {
    if (!id) return;

    try {
      setLoading(true);
      const res = await getAllStockHistoryById(id);
      setStockHistory(res.data);
    } catch (err) {
      const message = handleApiError(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { stockHistory, loading, error, fetchStockHistory };
};
