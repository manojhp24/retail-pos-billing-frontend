import PageHeader from "@/features/shared/PageHeader"
import { useProducts } from "@/features/product/hooks/useProducts";
import { ProductCard } from "../components/ProductCard";

import { Search, ShoppingCart } from "lucide-react";

export const BillingPage = () => {
    const { products, loading } = useProducts();
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
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            loading ? (<p>Loading.....</p>) :
                                (products.map((item) => {
                                    console.log(item);
                                    return <ProductCard
                                        key={item.id}
                                        name={item.name}
                                        price={item.price}
                                        stock={item.stock}
                                        onClick={() => console.log(item)}
                                    />
                                }))
                        }
                    </div>
                </div>

                {/* RIGHT - BILL */}
                <div className="bg-white rounded-lg shadow flex flex-col">

                    {/* Header */}
                    <div className="flex items-center gap-2 border-b p-4 font-semibold">
                        <ShoppingCart size={18} />
                        <span>Current Bill</span>
                    </div>

                    {/* Empty State */}
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        No items added
                    </div>

                    {/* Footer */}
                    <div className="border-t p-4">
                        <div className="flex justify-between mb-3 font-semibold">
                            <span>Total</span>
                            <span>₹0</span>
                        </div>

                        <button className="w-full bg-gray-200 text-gray-600 py-2 rounded-md">
                            Generate Bill
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};