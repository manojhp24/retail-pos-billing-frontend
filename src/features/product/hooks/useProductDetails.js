import { useMemo } from "react";

export const useProductDetails = (products, id) => {
  const product = useMemo(() => {
    return products.find((p) => p.id === Number(id));
  }, [products, id]);

  return { product };
};
