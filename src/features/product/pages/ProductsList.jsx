import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilter";
import { useProductForm } from "../hooks/useFormProduct";

import ProductTable from "../components/productTable";
import ProductModal from "../components/productModal";
import { ToastContainer } from "react-toastify";
import PageHeader from "@/features/shared/PageHeader";

const ProductsList = () => {
  const { products, addProduct, deleteProduct, updateProduct, loading } =
    useProducts();

  const {
    filteredProducts,
    categories,
    categoryCounts,
    selectedCategory,
    setSelectedCategory,
  } = useProductFilters(products);

  // 🔹 Form logic hook
  const {
    formData,
    handleChange,
    handleSubmit,
    handleEdit,
    handleAdd,
    isModalOpen,
    resetForm,
    editingProduct,
  } = useProductForm(addProduct, updateProduct);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <PageHeader title="Products" description="Manage your products" />

      <div className="w-full bg-white shadow-md rounded-xl p-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm border
                ${selectedCategory === cat
                  ? "bg-violet-100 border-violet-300 text-violet-800"
                  : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
            >
              {cat}
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100">
                {categoryCounts[cat] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <ProductTable
          products={filteredProducts}
          onDelete={deleteProduct}
          onEdit={handleEdit}
          onAdd={handleAdd}
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
        onClose={resetForm}
      />
    </>
  );
};

export default ProductsList;
