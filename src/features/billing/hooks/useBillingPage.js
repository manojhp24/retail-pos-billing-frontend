import { useState, useMemo, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const useBillingPage = (products, currentBill) => {
  const [search, setSearch] = useState("");

  // 🔹 Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  // 🔹 Print logic
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // 🔹 Auto print after bill created
  useEffect(() => {
    if (currentBill) {
      handlePrint();
    }
  }, [currentBill]);

  return {
    search,
    setSearch,
    filteredProducts,
    componentRef,
  };
};
