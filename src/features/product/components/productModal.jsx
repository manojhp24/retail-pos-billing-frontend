import { X, PackagePlus, Save } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <PackagePlus size={16} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {isEdit ? "Edit Product" : "Add Product"}
              </h2>
              <p className="text-xs text-gray-400">
                {isEdit ? "Update product details" : "Fill in the product details"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-3">

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</label>
            <input
              name="name"
              placeholder="Product name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 text-sm text-gray-700 placeholder-gray-400 px-3 py-2.5 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</label>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-200 text-sm text-gray-700 placeholder-gray-400 px-3 py-2.5 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-200 text-sm text-gray-700 px-3 py-2.5 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              <Save size={14} />
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;