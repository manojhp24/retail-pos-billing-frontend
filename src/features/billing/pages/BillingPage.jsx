import PageHeader from "@/features/shared/PageHeader"
import { useProducts } from "@/features/product/hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { useBilling } from "../hooks/useBill";

import { Search, ShoppingCart, Receipt, Trash2, Package } from "lucide-react";
import { useState } from "react";

export const BillingPage = () => {
    const { products, loading } = useProducts();
    const { billItems, total, increaseQty, decreaseQty, addToBill } = useBilling();
    const [search, setSearch] = useState("");
    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>
            <PageHeader
                title={"Billing"}
                description={"Manage your Billing here"}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT - PRODUCTS */}
                <div className="bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center border-b p-4">
                        <p className="font-semibold">Products</p>

                        {/* Search */}
                        <div className="flex items-center border rounded-md px-2 py-1">
                            <Search size={16} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="outline-none text-sm"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            loading ? (<p>Loading.....</p>) : filteredProducts.length === 0 ? (
                                <div className="col-span-full flex flex-col justify-center items-center text-gray-400 py-10">
                                    <Package />
                                    <p className="text-sm">No products found</p>
                                </div>
                            ) : (
                                filteredProducts.map((item) => {
                                    return <ProductCard
                                        key={item.id}
                                        name={item.name}
                                        price={item.price}
                                        stock={item.stock}
                                        onClick={() => addToBill(item)}
                                    />
                                })
                            )

                        }
                    </div>
                </div>

                {/* RIGHT - BILL */}
                <div className="bg-white rounded-xl shadow">

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2 font-semibold">
                            <ShoppingCart size={18} />
                            <span>Current Bill</span>
                        </div>
                        <span className="text-sm text-gray-500">
                            {billItems.length} item
                        </span>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-3 px-4 py-2 text-sm font-medium border-b text-gray-600">
                        <span>Product</span>
                        <span className="text-center">Qty</span>
                        <span className="text-right">Total</span>
                    </div>

                    {/* Items */}
                    {billItems.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-3 items-center px-4 py-3 border-b"
                        >
                            {/* Product */}
                            <span className="text-sm">{item.name}</span>

                            {/* Qty */}
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="border px-2 rounded hover:bg-gray-100"
                                >
                                    -
                                </button>

                                <span>{item.qty}</span>

                                <button
                                    onClick={() => increaseQty(item.id)}
                                    className="border px-2 rounded hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>

                            {/* Total + Delete */}
                            <div className="flex items-center justify-end gap-3">
                                <span className="font-medium">
                                    ₹{item.price * item.qty}
                                </span>

                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="text-red-500 hover:text-red-600"
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
                            <span>₹{total}</span>
                        </div>

                        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
                            Generate Bill
                        </button>
                    </div>

                </div>



            </div>
        </>
    );
};