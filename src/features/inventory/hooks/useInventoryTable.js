import { useState } from "react";
import { useInventory } from "./useInventory";
import { useStockHistory } from "@/features/stock-history/hooks/useStockHistory";

export const useInventoryTable = () => {
  const { inventory, inventoryRestock, inventoryReduce } = useInventory();
  const { stockHistory, loading, fetchStockHistory } = useStockHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionType, setActionType] = useState(null);

  // 🔹 Transform data
  const inventoryData = inventory.map((item) => ({
    id: item.product.id,
    product: item.product.name,
    stock: item.stock,
    lastUpdated: item.lastUpdated,
  }));

  // 🔹 Actions
  const handleAction = async (row, type) => {
    setSelectedProduct(row);
    setActionType(type);
    setIsModalOpen(true);

    if (type === "history") {
      await fetchStockHistory(row.id);
    }
  };

  const handleConfirm = async (quantity) => {
    if (!selectedProduct || !actionType) return;

    if (actionType === "restock") {
      await inventoryRestock(selectedProduct.id, quantity);
    } else {
      await inventoryReduce(selectedProduct.id, quantity);
    }

    setIsModalOpen(false);
  };

  return {
    inventoryData,
    isModalOpen,
    setIsModalOpen,
    selectedProduct,
    actionType,
    handleAction,
    handleConfirm,
    stockHistory,
    loading,
  };
};
