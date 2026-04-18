import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/features/shared/PageHeader";
import { useProducts } from "../hooks/useProducts";
import { useProductDetails } from "../hooks/useProductDetails";

export const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, loading, error, deleteProduct } = useProducts();
    const { product } = useProductDetails(products, id);

    if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!product) return <p className="p-6">Product not found</p>;

    return (
        <>
            <PageHeader
                title="Product Overview"
                description="Detailed product information"
            />


            <div className="mx-auto">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-500 hover:text-gray-900"
                    >
                        ← Back
                    </button>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-100">
                            Edit
                        </button>
                        <button
                            onClick={() => deleteProduct(product.id)}
                            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* MAIN CARD */}
                <div className="bg-white rounded-2xl border shadow-sm p-8">

                    {/* HEADER */}
                    <div className="flex justify-between items-start border-b pb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {product.name}
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                SKU: {product.sku}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-400">Price</p>
                            <p className="text-3xl font-bold text-green-600">
                                ₹{product.sellingPrice}
                            </p>
                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-8 mt-8">

                        {/* LEFT */}
                        <div className="md:col-span-2 space-y-8">

                            {/* BASIC INFO */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Basic Information
                                </h3>

                                <div className="grid grid-cols-2 gap-6 text-sm">
                                    <Info label="Brand" value={product.brand} />
                                    <Info label="Category" value={product.category} />
                                    <Info label="Barcode" value={product.barcode} />
                                    <Info
                                        label="Created"
                                        value={
                                            product.createdAt
                                                ? new Date(product.createdAt).toLocaleDateString()
                                                : "N/A"
                                        }
                                    />
                                </div>
                            </div>

                            {/* UNIT SYSTEM */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Unit Configuration
                                </h3>

                                <div className="flex items-center gap-4 bg-gray-50 border rounded-xl p-4">
                                    <span className="text-sm text-gray-500">1</span>
                                    <span className="font-medium">{product.unit}</span>
                                    <span className="text-gray-400">=</span>
                                    <span className="font-semibold text-gray-900">
                                        {product.unitValue} {product.baseUnit}
                                    </span>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {product.description || "No description available"}
                                </p>
                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="space-y-6">

                            <SummaryCard label="Cost Price" value={`₹${product.costPrice}`} />
                            <SummaryCard label="Tax" value={`${product.taxPercent}%`} />

                            <div className="bg-gray-50 border rounded-xl p-4">
                                <p className="text-xs text-gray-400">Stock</p>
                                <p className="text-xl font-semibold mt-1">
                                    {product.stock}
                                </p>

                                {product.stock < 5 && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Low stock
                                    </p>
                                )}
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 mb-1">Status</p>
                                <span
                                    className={`px-3 py-1 text-xs rounded-full ${product.stock > 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {product.stock > 0 ? "Active" : "Out of stock"}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

/* 🔹 Small reusable components */
const Info = ({ label, value }) => (
    <div>
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="font-medium text-gray-900">
            {value || "N/A"}
        </p>
    </div>
);

const SummaryCard = ({ label, value }) => (
    <div className="bg-gray-50 border rounded-xl p-4">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
);