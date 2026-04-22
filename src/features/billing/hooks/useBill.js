import { useState } from "react";
import { createBillApi } from "../services/billingApi";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandler";

export const useBilling = () => {
  const [billItems, setBillItems] = useState([]);
  const [loading, setLoading] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);

  const generateBill = () => {
    if (billItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setShowModal(true);
  };

  const confirmAndPrint = async () => {
    try {
      setLoading(true);

      const billData = {
        items: billItems.map((item) => ({
          productId: item.id,
          quantity: item.qty,
        })),
        discount: 0,
      };

      const res = await createBillApi(billData);

      toast.success("Bill saved");
      const formattedBill = {
        ...res.data,
        items: billItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.qty,
          price: item.sellingPrice,
        })),
        total: billItems.reduce(
          (sum, item) => sum + item.sellingPrice * item.qty,
          0,
        ),
      };

      setCurrentBill(formattedBill);

      setTimeout(() => {
        setShowModal(false);
        setBillItems([]);
      }, 800);

      return formattedBill;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.Message ||
        error.response?.data?.error ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const addToBill = (product) => {
    setBillItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setBillItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setBillItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };
  const total = billItems.reduce(
    (sum, item) => sum + (item.sellingPrice || 0) * (item.qty || 0),
    0,
  );

  return {
    billItems,
    addToBill,
    increaseQty,
    decreaseQty,
    total,
    generateBill,

    showModal,
    setShowModal,
    currentBill,

    confirmAndPrint,
  };
};
