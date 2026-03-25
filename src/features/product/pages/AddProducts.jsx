import { useState } from "react";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-6 flex justify-center bg-blue-50 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Add Product
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">Price</label>
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="Enter quantity"
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
