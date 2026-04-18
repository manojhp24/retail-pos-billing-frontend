import { useEffect, useState, useRef } from "react";
import {
  getAllProducts,
  createProducts,
  deleteProductApi,
  updateProductsApi,
} from "../services/productApi";
import { getAllInventory } from "@/features/inventory/services/inventoryApi";
import { handleApiError } from "@/utils/errorHandler";
import { toast } from "react-toastify";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const mergeWithStock = (products, inventory) =>
    products.map((p) => {
      const stockItem = inventory.find((i) => i.product.id === p.id);
      return { ...p, stock: stockItem?.stock || 0 };
    });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsRes, inventoryRes] = await Promise.all([
        getAllProducts(),
        getAllInventory(),
      ]);

      setProducts(mergeWithStock(productsRes.data, inventoryRes.data));
    } catch (err) {
      const msg = handleApiError(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    try {
      await createProducts(data);
      toast.success("Product added");
      fetchProducts();
    } catch (err) {
      toast.error(handleApiError(err));
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductApi(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error(handleApiError(err));
    }
  };

  const updateProduct = async (data) => {
    try {
      await updateProductsApi(data.id, data);

      setProducts((prev) =>
        prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)),
      );

      toast.success("Product updated");
    } catch (err) {
      toast.error(handleApiError(err));
    }
  };

  // 🔹 Initial fetch
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    deleteProduct,
    updateProduct,
    refetch: fetchProducts,
  };
};
