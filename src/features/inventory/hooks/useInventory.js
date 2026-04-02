import { useState, useEffect } from "react";
import {
  getAllInventory,
  restockInventory,
  reduceInventory,
} from "../services/inventoryApi";
import { handleApiError } from "@/utils/errorHandler";
import { toast } from "react-toastify";

// 🔹 Success message mapping
const SUCCESS_MESSAGES = {
  restock: "Inventory restocked successfully",
  reduce: "Inventory reduced successfully",
};

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch inventory
  const fetchAllInventory = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAllInventory();
      setInventory(res.data);
    } catch (err) {
      const message = handleApiError(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update stock (common logic)
  const updateInventory = (id, quantity, type) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? {
              ...item,
              stock:
                type === "restock"
                  ? item.stock + quantity
                  : item.stock - quantity,
            }
          : item,
      ),
    );
  };

  // 🔹 Restock
  const inventoryRestock = async (id, quantity) => {
    try {
      setLoading(true);

      await restockInventory(id, quantity);
      updateInventory(id, quantity, "restock");

      toast.success(SUCCESS_MESSAGES.restock);
    } catch (err) {
      const message = handleApiError(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reduce
  const inventoryReduce = async (id, quantity) => {
    try {
      setLoading(true);

      await reduceInventory(id, quantity);
      updateInventory(id, quantity, "reduce");

      toast.success(SUCCESS_MESSAGES.reduce);
    } catch (err) {
      const message = handleApiError(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInventory();
  }, []);

  return {
    inventory,
    loading,
    error,
    fetchAllInventory,
    inventoryRestock,
    inventoryReduce,
  };
};
