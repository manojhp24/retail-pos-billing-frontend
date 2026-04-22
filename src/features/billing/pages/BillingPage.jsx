import PageHeader from "@/features/shared/PageHeader";
import { useProducts } from "@/features/product/hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { useBilling } from "../hooks/useBill";
import { useBillingPage } from "../hooks/useBillingPage";
import { ToastContainer } from "react-toastify";
import { BillPrint } from "../components/BillPrint";
import { Search, ShoppingCart, Trash2, Package } from "lucide-react";

export const BillingPage = () => {
    const {
        billItems,
        total,
        increaseQty,
        decreaseQty,
        addToBill,
        generateBill,
        showModal,
        setShowModal,
        confirmAndPrint,
        currentBill,
    } = useBilling();

    const { products, loading } = useProducts();
    const { search, setSearch, filteredProducts, componentRef, handlePrint } = useBillingPage(products, currentBill);

    return (
        <>
            <PageHeader title="Billing" description="Manage your billing here" />
            <ToastContainer position="bottom-right" autoClose={3000} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* LEFT — Products */}
                <div className="bg-white border border-gray-300 rounded overflow-hidden">

                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-800">Products</p>
                        <div className="flex items-center border border-gray-300 rounded px-2.5 py-1.5 bg-white">
                            <Search size={14} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="outline-none text-sm text-gray-700 placeholder-gray-400"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {loading ? (
                            <p className="text-sm text-gray-400">Loading...</p>
                        ) : filteredProducts.length === 0 ? (
                            <div className="col-span-full text-center text-gray-400 py-10">
                                <Package size={28} className="mx-auto mb-2 opacity-40" />
                                <p className="text-sm">No products found</p>
                            </div>
                        ) : (
                            filteredProducts.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    name={item.name}
                                    price={item.sellingPrice}
                                    stock={item.stock}
                                    onClick={() => addToBill(item)}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* RIGHT — Bill */}
                <div className="bg-white border border-gray-300 rounded overflow-hidden flex flex-col">

                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-gray-50">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <ShoppingCart size={16} />
                            Current Bill
                        </div>
                        <span className="text-xs text-gray-500">{billItems.length} items</span>
                    </div>

                    {/* Bill Items */}
                    <div className="flex-1 divide-y divide-gray-200">
                        {billItems.map((item) => (
                            <div key={item.id} className="grid grid-cols-3 items-center px-4 py-3">

                                <span className="text-sm text-gray-700">{item.name}</span>

                                {/* Qty Controls */}
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm text-gray-800 w-4 text-center">{item.qty}</span>
                                    <button
                                        onClick={() => increaseQty(item.id)}
                                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Price + Delete */}
                                <div className="flex justify-end items-center gap-3">
                                    <span className="text-sm font-medium text-gray-800">
                                        ₹{(item.sellingPrice || 0) * (item.qty || 0)}
                                    </span>
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-4 border-t border-gray-300 bg-gray-50">
                        <div className="flex justify-between items-center font-semibold text-gray-800 mb-3">
                            <span className="text-sm">Total</span>
                            <span className="text-base">₹{total || 0}</span>
                        </div>
                        <button
                            disabled={billItems.length === 0}
                            onClick={generateBill}
                            className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2 rounded transition-colors"
                        >
                            Generate Bill
                        </button>
                    </div>
                </div>
            </div>

            {/* Bill Preview Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white border border-gray-300 rounded w-[300px] overflow-hidden">

                        {/* Modal Header */}
                        <div className="px-4 py-3 border-b border-gray-300 bg-gray-50 text-center">
                            <h3 className="text-sm font-semibold text-gray-800">My Shop</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{new Date().toLocaleString()}</p>
                        </div>

                        {/* Bill Items */}
                        <div className="px-4 py-3 divide-y divide-gray-100">
                            {billItems.map((item) => (
                                <div key={item.id} className="py-2 text-sm text-gray-700">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {item.qty} x ₹{item.sellingPrice} = ₹{(item.sellingPrice || 0) * (item.qty || 0)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="px-4 py-3 border-t border-gray-300 bg-gray-50 space-y-1">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{total || 0}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>GST (18%)</span>
                                <span>₹{((total || 0) * 0.18).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-semibold text-gray-800 pt-1 border-t border-gray-200">
                                <span>Total</span>
                                <span>₹{((total || 0) * 1.18).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div className="flex gap-2 px-4 py-3 border-t border-gray-300">
                            <button
                                onClick={confirmAndPrint}
                                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-1.5 rounded transition-colors"
                            >
                                Print
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-medium py-1.5 rounded transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden Print Component */}
            <div style={{ position: "fixed", bottom: 0, left: 0, opacity: 0 }}>
                <BillPrint ref={componentRef} bill={currentBill} />
            </div>
        </>
    );
};