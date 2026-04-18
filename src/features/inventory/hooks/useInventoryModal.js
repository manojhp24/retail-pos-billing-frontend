import { useState, useMemo } from "react";

export const useInventoryModal = ({
  actionType,
  selectedProduct,
  setIsModalOpen,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState("");

  const isRestock = actionType === "restock";

  const quantityNumber = Number(quantity);

  const newStock = useMemo(() => {
    if (!quantity) return null;

    return isRestock
      ? selectedProduct.stock + quantityNumber
      : selectedProduct.stock - quantityNumber;
  }, [quantity, isRestock, selectedProduct, quantityNumber]);

  const isReduceError =
    !isRestock && quantity && quantityNumber > selectedProduct.stock;

  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    if (!quantity || isReduceError) return;

    onConfirm(quantityNumber);
    closeModal();
  };

  return {
    quantity,
    setQuantity,
    isRestock,
    newStock,
    isReduceError,
    handleConfirm,
    closeModal,
  };
};
