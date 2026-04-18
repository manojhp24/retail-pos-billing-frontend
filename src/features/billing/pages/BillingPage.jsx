import PageHeader from "@/features/shared/PageHeader";
import { useProducts } from "@/features/product/hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { useBilling } from "../hooks/useBill";
import { ToastContainer } from "react-toastify";

import { Search, ShoppingCart, Trash2, Package } from "lucide-react";
import { useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { BillPrint } from "../components/BillPrint";
import { useEffect } from "react";

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
        currentBill
    } = useBilling();
    const { products, loading } = useProducts();
    useEffect(() => {
        if (currentBill) {
            handlePrint();
        }
    }, [currentBill]);
    console.log("currentBill:", currentBill);

    const [search, setSearch] = useState("");

    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => {
            if (!componentRef.current) {
                console.error("❌ Print ref is null");
                return;
            }
            return componentRef.current;
        },
    });

    return (
        <>
            <PageHeader title="Billing" description="Manage your Billing here" />
            <ToastContainer position="bottom-right" autoClose={3000} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT - PRODUCTS */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="flex justify-between items-center border-b p-4">
                        <p className="font-semibold">Products</p>

                        <div className="flex items-center border rounded-md px-2 py-1">
                            <Search size={16} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="outline-none text-sm"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : filteredProducts.length === 0 ? (
                            <div className="col-span-full text-center text-gray-400 py-10">
                                <Package />
                                <p>No products</p>
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

                {/* RIGHT - BILL */}
                <div className="bg-white rounded-xl shadow-sm">

                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <div className="flex items-center gap-2 font-semibold">
                            <ShoppingCart size={18} />
                            Current Bill
                        </div>
                        <span className="text-sm text-gray-500">
                            {billItems.length} items
                        </span>
                    </div>

                    {/* Items */}
                    {billItems.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-3 items-center px-4 py-3 border-b"
                        >
                            <span className="text-sm">{item.name}</span>

                            {/* Qty */}
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="border px-2 rounded"
                                >
                                    -
                                </button>
                                <span>{item.qty}</span>
                                <button
                                    onClick={() => increaseQty(item.id)}
                                    className="border px-2 rounded"
                                >
                                    +
                                </button>
                            </div>

                            {/* Total */}
                            <div className="flex justify-end gap-3">
                                <span className="font-medium">
                                    ₹{(item.sellingPrice || 0) * (item.qty || 0)}
                                </span>

                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Footer */}
                    <div className="p-4">
                        <div className="flex justify-between font-semibold text-lg mb-3">
                            <span>Total</span>
                            <span>₹{total || 0}</span>
                        </div>

                        <button
                            disabled={billItems.length === 0}
                            onClick={generateBill}
                            className="w-full bg-green-500 text-white py-2 rounded-lg"
                        >
                            Generate Bill
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-[300px]">

                        <h3 className="text-center font-bold">My Shop</h3>
                        <p className="text-sm">{new Date().toLocaleString()}</p>

                        <hr className="my-2" />

                        {billItems.map((i) => (
                            <div key={i.id} className="text-sm mb-2">
                                {i.name}<br />
                                {i.qty} x ₹{i.sellingPrice} = ₹{(i.sellingPrice || 0) * (i.qty || 0)}
                            </div>
                        ))}

                        <hr className="my-2" />

                        <p>Subtotal: ₹{total || 0}</p>
                        <p>GST: ₹{((total || 0) * 0.18).toFixed(2)}</p>
                        <h4 className="font-bold">
                            Total: ₹{((total || 0) * 1.18).toFixed(2)}
                        </h4>

                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={confirmAndPrint}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Print
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-3 py-1 rounded"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <div style={{ position: "fixed", bottom: 0, left: 0, opacity: 0 }}>
                <BillPrint ref={componentRef} bill={currentBill} />
            </div>
        </>
    );
};