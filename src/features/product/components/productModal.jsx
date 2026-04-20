import { X } from "lucide-react";

const categories = [
  "Rice & Grains",
  "Pulses & Dal",
  "Flour & Atta",
  "Oil & Ghee",
  "Spices & Masala",
  "Sugar & Salt",
  "Dairy Products",
  "Snacks & Namkeen",
  "Beverages",
  "Biscuits & Bakery",
  "Frozen Foods",
  "Dry Fruits & Nuts",
  "Cleaning Supplies",
  "Personal Care",
];

const ProductModal = ({ isOpen, onClose, formData, handleChange, handleSubmit, isEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded border border-gray-300 overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-300 bg-gray-50">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in the product details
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X size={17} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">

          {/* Basic */}
          <div className="space-y-3">
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
            <div className="grid grid-cols-3 gap-3">
              <input
                name="unitValue"
                type="number"
                placeholder="Value (e.g. 25)"
                value={formData.unitValue}
                onChange={handleChange}
                className="input"
              />
              <select name="unit" value={formData.unit} onChange={handleChange} className="input">
                <option value="">Unit</option>
                <option value="bag">Bag</option>
                <option value="box">Box</option>
                <option value="pack">Pack</option>
                <option value="pcs">Pieces</option>
              </select>
              <select name="baseUnit" value={formData.baseUnit} onChange={handleChange} className="input">
                <option value="">Base</option>
                <option value="kg">Kg</option>
                <option value="g">Gram</option>
                <option value="ltr">Liter</option>
                <option value="ml">ML</option>
              </select>
            </div>
            <select name="category" value={formData.category} onChange={handleChange} className="input">
              <option value="">Select Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>{cate}</option>
              ))}
            </select>
          </div>

          {/* Pricing */}
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

          {/* Additional */}
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
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-700 text-white hover:bg-blue-800 transition-colors"
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