import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilter";
import { useProductForm } from "../hooks/useFormProduct";
import ProductTable from "../components/productTable";
import ProductModal from "../components/productModal";
import { ToastContainer } from "react-toastify";
import PageHeader from "@/features/shared/PageHeader";

const ProductsList = () => {
  const { products, addProduct, deleteProduct, updateProduct, loading } = useProducts();

  const {
    filteredProducts,
    categories,
    categoryCounts,
    selectedCategory,
    setSelectedCategory,
  } = useProductFilters(products);

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

      <div className="bg-white border border-gray-300 rounded p-5">

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm border transition-colors
                ${selectedCategory === cat
                  ? "bg-gray-800 border-gray-800 text-white"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
            >
              {cat}
              <span className="text-xs px-1.5 py-0.5 rounded border border-gray-300 bg-gray-100 text-gray-600">
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