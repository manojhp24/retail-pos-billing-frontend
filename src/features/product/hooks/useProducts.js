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

  const mergeProductsWithStock = (products, inventory) => {
    return products.map((p) => {
      const stockItem = inventory.find((i) => i.product.id === p.id);
      return {
        ...p,
        stock: stockItem ? stockItem.stock : 0,
      };
    });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productRes, inventoryRes] = await Promise.all([
        getAllProducts(),
        getAllInventory(),
      ]);

      const merged = mergeProductsWithStock(productRes.data, inventoryRes.data);

      setProducts(merged);
    } catch (err) {
      const message = handleApiError(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CRUD
  const addProduct = async (newProduct) => {
    try {
      await createProducts(newProduct);
      toast.success("Product Added");
      fetchProducts();
    } catch (error) {
      const message = handleApiError(error);
      toast.error(message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductApi(id);
      toast.success("Product Deleted");
      fetchProducts();
    } catch (error) {
      const message = handleApiError(error);
      toast.error(message);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await updateProductsApi(updatedProduct.id, updatedProduct);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p,
        ),
      );

      toast.success("Product Updated");
    } catch (err) {
      const message = handleApiError(err);
      toast.error(message);
    }
  };

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
