import { useState } from "react";

const defaultForm = {
  name: "",
  sku: "",
  brand: "",
  category: "",
  costPrice: "",
  sellingPrice: "",
  taxPercent: "",
  unitValue: "",
  unit: "",
  baseUnit: "",
  barcode: "",
  description: "",
};

export const useProductForm = (addProduct, updateProduct) => {
  const [formData, setFormData] = useState(defaultForm);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(defaultForm);
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      costPrice: Number(formData.costPrice) || 0,
      sellingPrice: Number(formData.sellingPrice) || 0,
      taxPercent: Number(formData.taxPercent) || 0,
      unitValue: Number(formData.unitValue) || 1,
    };

    if (editingProduct) {
      updateProduct({ ...payload, id: editingProduct.id });
    } else {
      addProduct(payload);
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ ...defaultForm, ...product });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData(defaultForm);
    setIsModalOpen(true);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleEdit,
    handleAdd,
    isModalOpen,
    resetForm,
    editingProduct,
  };
};
