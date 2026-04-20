import { Package, IndianRupee, AlertCircle } from "lucide-react";

export const ProductCard = ({ name, price, stock, onClick }) => {
    const isOutOfStock = stock === 0;

    return (
        <div
            onClick={!isOutOfStock ? onClick : undefined}
            className={`h-full border p-4 bg-white 
        transition-all duration-200 group
        hover:shadow-lg hover:-translate-y-1 hover:border-blue-300
        ${isOutOfStock ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
      `}
        >
            <div className="flex flex-col h-full justify-between">

                {/* Top Section */}
                <div>
                    {/* Badge */}
                    {isOutOfStock ? (
                        <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 bg-red-100 text-red-600 rounded-full flex items-center gap-1">
                            <AlertCircle size={10} /> Out
                        </span>
                    ) : stock < 5 ? (
                        <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full">
                            Low
                        </span>
                    ) : null}

                    {/* Name (fixed height) */}
                    <p className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[42px]">
                        {name}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-1 text-lg font-bold text-blue-600">
                        <IndianRupee size={16} />
                        <span>{price}</span>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 border-t pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-500">
                        <Package size={14} />
                        <span>
                            {isOutOfStock ? "Out of stock" : `${stock} left`}
                        </span>
                    </div>

                    {!isOutOfStock && (
                        <span className="text-[10px] text-blue-500 opacity-0 group-hover:opacity-100 transition">
                            Add →
                        </span>
                    )}
                </div>

            </div>
        </div>
    );
};