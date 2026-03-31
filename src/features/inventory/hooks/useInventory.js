import { useState, useEffect } from "react";
import { getAllInventory } from "../services/inventoryApi";
import { handleApiError } from "@/utils/errorHandler";
import { toast } from "react-toastify";

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllInevntory = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllInventory();
      setInventory(res.data);
    } catch (error) {
      const message = handleApiError(error);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInevntory();
  }, []);

  return { inventory, loading, error, fetchAllInevntory };
};
