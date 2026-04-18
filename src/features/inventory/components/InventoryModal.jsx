import {
    X,
    Package,
    TrendingUp,
    TrendingDown,
    AlertCircle,
} from "lucide-react";

import { AppModal } from "@/features/shared/AppModal";
import { useInventoryModal } from "../hooks/useInventoryModal";

export default function InventoryModal({
    isModalOpen = true,
    setIsModalOpen = () => { },
    actionType = "restock",
    selectedProduct = { product: "Ghurkha Pants", stock: 0 },
    onConfirm = () => { },
}) {
    const {
        quantity,
        setQuantity,
        isRestock,
        newStock,
        isReduceError,
        handleConfirm,
        closeModal,
    } = useInventoryModal({
        actionType,
        selectedProduct,
        setIsModalOpen,
        onConfirm,
    });

    return (
        <AppModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={isRestock ? "Restock Product" : "Reduce Stock"}
            subtitle="Inventory Management"
            icon={
                isRestock ? (
                    <TrendingUp className="text-blue-600" size={16} />
                ) : (
                    <TrendingDown className="text-red-500" size={16} />
                )
            }
        >
            <div className="fixed inset-0 bg-black/40" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden bg-white border border-gray-200">

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${isRestock ? "bg-blue-50" : "bg-red-50"
                                    }`}
                            >
                                {isRestock ? (
                                    <TrendingUp size={16} className="text-blue-600" />
                                ) : (
                                    <TrendingDown size={16} className="text-red-500" />
                                )}
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {isRestock ? "Restock Product" : "Reduce Stock"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Inventory Management
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={closeModal}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-5">

                        {/* Product Info */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 bg-gray-50 border border-gray-200">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Package size={16} className="text-blue-600" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400">Product</p>
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                    {selectedProduct?.product}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-xs text-gray-400">Current Stock</p>
                                <p
                                    className={`text-lg font-bold ${selectedProduct?.stock === 0
                                        ? "text-red-500"
                                        : "text-emerald-600"
                                        }`}
                                >
                                    {selectedProduct?.stock}
                                </p>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-5">
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                Quantity
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter amount..."
                                className={`w-full rounded-xl px-4 py-2.5 text-sm border ${isReduceError
                                    ? "border-red-300"
                                    : "border-gray-200"
                                    }`}
                            />

                            {isReduceError && (
                                <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500">
                                    <AlertCircle size={12} />
                                    Cannot reduce below zero. Max: {selectedProduct.stock}
                                </div>
                            )}
                        </div>

                        {/* Preview */}
                        {quantity && !isReduceError && (
                            <div
                                className={`flex justify-between px-4 py-2.5 rounded-xl mb-5 border ${isRestock
                                    ? "bg-emerald-50 border-emerald-200"
                                    : "bg-red-50 border-red-200"
                                    }`}
                            >
                                <span className="text-sm text-gray-500">
                                    Stock after update
                                </span>
                                <span className="font-bold">
                                    {newStock}
                                </span>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-2.5 rounded-xl text-sm border border-gray-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirm}
                                disabled={!quantity || isReduceError}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white ${isRestock
                                    ? "bg-blue-600"
                                    : "bg-red-500"
                                    }`}
                            >
                                {isRestock ? "Add Stock" : "Reduce Stock"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppModal>
    );
}