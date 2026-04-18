import { useMemo, useState } from "react";

export const useProductFilters = (products) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const activeProducts = useMemo(
    () => products.filter((p) => p.active),
    [products],
  );

  const categories = useMemo(() => {
    const cats = [
      ...new Set(activeProducts.map((p) => p.category).filter(Boolean)),
    ];
    return ["All", ...cats];
  }, [activeProducts]);

  const categoryCounts = useMemo(() => {
    const counts = { All: activeProducts.length };
    activeProducts.forEach((p) => {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [activeProducts]);

  const filteredProducts = useMemo(() => {
    return selectedCategory === "All"
      ? activeProducts
      : activeProducts.filter((p) => p.category === selectedCategory);
  }, [activeProducts, selectedCategory]);

  return {
    filteredProducts,
    categories,
    categoryCounts,
    selectedCategory,
    setSelectedCategory,
  };
};
