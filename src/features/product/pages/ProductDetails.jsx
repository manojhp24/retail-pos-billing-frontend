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


            <div className="mx-auto px-4">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-xs text-gray-600 hover:text-black"
                    >
                        ← Back
                    </button>

                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs border rounded bg-white hover:bg-gray-100">
                            Edit
                        </button>
                        <button
                            onClick={() => deleteProduct(product.id)}
                            className="px-3 py-1 text-xs rounded bg-red-500 text-white"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* MAIN */}
                <div className="bg-white border rounded-lg shadow-sm">

                    {/* HEADER */}
                    <div className="flex justify-between items-center px-4 py-3 border-b">
                        <div>
                            <h1 className="text-lg font-semibold">{product.name}</h1>
                            <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-400">Selling Price</p>
                            <p className="text-xl font-bold text-green-600">
                                ₹{product.sellingPrice}
                            </p>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="grid grid-cols-3">

                        {/* LEFT */}
                        <div className="col-span-2 border-r p-4 space-y-4">

                            {/* BASIC INFO (TABLE STYLE) */}
                            <div>
                                <h3 className="text-xs font-semibold text-gray-600 mb-2">
                                    BASIC INFO
                                </h3>

                                <div className="grid grid-cols-2 text-sm border rounded">
                                    <InfoRow label="Brand" value={product.brand} />
                                    <InfoRow label="Category" value={product.category} />
                                    <InfoRow label="Barcode" value={product.barcode} />
                                    <InfoRow
                                        label="Created"
                                        value={
                                            product.createdAt
                                                ? new Date(product.createdAt).toLocaleDateString()
                                                : "N/A"
                                        }
                                    />
                                </div>
                            </div>

                            {/* UNIT */}
                            <div>
                                <h3 className="text-xs font-semibold text-gray-600 mb-2">
                                    UNIT CONFIG
                                </h3>

                                <div className="flex items-center gap-2 text-sm border rounded px-3 py-2 bg-gray-50">
                                    <span>1</span>
                                    <span className="font-medium">{product.unit}</span>
                                    <span>=</span>
                                    <span className="font-semibold">
                                        {product.unitValue} {product.baseUnit}
                                    </span>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <h3 className="text-xs font-semibold text-gray-600 mb-1">
                                    DESCRIPTION
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {product.description || "No description"}
                                </p>
                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="p-4 space-y-3 text-sm">

                            <MiniCard label="Cost Price" value={`₹${product.costPrice}`} />
                            <MiniCard label="Tax" value={`${product.taxPercent}%`} />

                            <div className="border rounded p-3">
                                <p className="text-xs text-gray-400">Stock</p>
                                <p className="font-semibold">{product.stock}</p>

                                {product.stock < 5 && (
                                    <p className="text-xs text-red-500">Low stock</p>
                                )}
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">Status</p>
                                <span
                                    className={`px-2 py-0.5 text-xs rounded ${product.stock > 0
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

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between border-b px-3 py-2">
        <span className="text-gray-500 text-xs">{label}</span>
        <span className="font-medium">{value || "N/A"}</span>
    </div>
);

const MiniCard = ({ label, value }) => (
    <div className="border rounded p-3">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
);