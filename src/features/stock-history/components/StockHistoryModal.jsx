import { TrendingUp, TrendingDown } from "lucide-react";

const StockHistoryModal = ({ history = [], loading = false }) => {

    if (loading) {
        return (
            <p className="text-center text-sm text-gray-400">
                Loading history...
            </p>
        );
    }

    if (!history.length) {
        return (
            <p className="text-center text-sm text-gray-400">
                No stock history available
            </p>
        );
    }

    return (
        <div className="max-h-80 overflow-y-auto space-y-4">
            {history.map((item) => {
                const isRestock = item.action === "RESTOCK";

                return (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
                    >
                        {/* Icon */}
                        <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center ${isRestock ? "bg-blue-50" : "bg-red-50"
                                }`}
                        >
                            {isRestock ? (
                                <TrendingUp size={16} className="text-blue-600" />
                            ) : (
                                <TrendingDown size={16} className="text-red-500" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">
                                {isRestock ? "Stock Added" : "Stock Reduced"}
                            </p>

                            <p className="text-xs text-gray-400">
                                {new Date(item.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* Quantity */}
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Qty</p>
                            <p
                                className={`text-lg font-bold ${isRestock ? "text-emerald-600" : "text-red-500"
                                    }`}
                            >
                                {isRestock ? `+${item.quantity}` : `-${item.quantity}`}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StockHistoryModal;