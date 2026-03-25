import { useState } from "react";
import { useProducts } from "../hooks/useProducts";

import ProductTable from "../components/productTable";
import ProductModal from "../components/productModal";
import { ToastContainer } from "react-toastify";

const ProductsList = () => {
  const { products, addProduct, deleteProduct, updateProduct, loading, error } =
    useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      updateProduct(formData);
    } else {
      addProduct(formData);
    }

    setEditingProduct(null);
    setFormData({ name: "", price: "", quantity: "", category: "" });
    setIsModalOpen(false);
  };

  const handelEdit = (p) => {
    setEditingProduct(p);
    setFormData(p);
    setIsModalOpen(true);
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className=" flex justify-center">
        <div className="w-full bg-white shadow-md rounded-xl p-6">
          {/* Header */}
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
          </div>

          {/* Table */}

          <ProductTable
            products={products}
            onDelete={deleteProduct}
            onEdit={handelEdit}
            onAdd={() => {
              setEditingProduct(null);
              setFormData({
                name: "",
                price: "",
                quantity: "",
                category: "",
              });
              setIsModalOpen(true);
            }}
            loading={loading}
          />
        </div>

        {/* Modal */}
        <ProductModal
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEdit={!!editingProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default ProductsList;
