import { X } from "lucide-react";

const ProductModal = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  isEdit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Fill in the product details
            </p>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* ===== Basic ===== */}
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Product name"
              value={formData.name}
              onChange={handleChange}
              className="input"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                className="input"
              />
              <input
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="unitValue"
                type="number"
                placeholder="Unit Value (e.g. 25)"
                className="input"
                value={formData.unitValue}
                onChange={handleChange}
              />

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Unit</option>
                <option value="pcs">Pieces (pcs)</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="g">Gram (g)</option>
                <option value="ltr">Liter (ltr)</option>
                <option value="ml">Milliliter (ml)</option>
                <option value="box">Box</option>
                <option value="pack">Pack</option>
              </select>
            </div>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Books</option>
            </select>
          </div>

          {/* ===== Pricing ===== */}
          <div className="grid grid-cols-3 gap-3">
            <input
              name="costPrice"
              type="number"
              placeholder="Cost"
              value={formData.costPrice}
              onChange={handleChange}
              className="input"
            />
            <input
              name="sellingPrice"
              type="number"
              placeholder="Selling"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="input"
            />
            <input
              name="taxPercent"
              type="number"
              placeholder="Tax %"
              value={formData.taxPercent}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* ===== Additional ===== */}
          <div className="space-y-3">
            <input
              name="barcode"
              placeholder="Barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="input"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="input resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductModal;