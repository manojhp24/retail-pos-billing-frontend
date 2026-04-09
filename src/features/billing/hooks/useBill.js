import { useState } from "react";

export const useBilling = () => {
  const [billItems, setBillItems] = useState([]);

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

  const total = billItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return { billItems, addToBill, increaseQty, decreaseQty, total };
};
