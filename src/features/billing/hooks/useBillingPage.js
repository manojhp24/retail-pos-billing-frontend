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
    contentRef: componentRef,
  });

  useEffect(() => {
    if (currentBill && componentRef.current) {
      const timer = setTimeout(() => {
        handlePrint();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentBill]);
  return {
    search,
    setSearch,
    filteredProducts,
    componentRef,
    handlePrint,
  };
};
