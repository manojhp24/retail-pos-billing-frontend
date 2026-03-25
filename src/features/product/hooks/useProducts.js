import { useEffect, useState } from "react";
import {
  getAllProducts,
  createProducts,
  deleteProductApi,
  updateProductsApi,
} from "../services/productApi";

import { handleApiError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
import { useRef } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllProducts();
      setProducts(res.data);
      console.log(res.data);
    } catch (err) {
      const message = handleApiError(err);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

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
      fetchProducts();
      toast.success("Product Deleted");
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

  return { products, loading, addProduct, deleteProduct, updateProduct, error };
};
