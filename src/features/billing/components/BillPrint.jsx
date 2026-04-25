import React, { forwardRef } from "react";

export const BillPrint = forwardRef(({ bill }, ref) => {
    if (!bill) return null;

    return (
        <div
            ref={ref}
            className="w-80 mx-auto bg-white font-mono text-gray-800 px-6 py-8 shadow-lg border border-dashed border-gray-300"
        >
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold tracking-widest uppercase text-gray-900">
                    My Shop
                </h2>
                <p className="text-xs text-gray-400 mt-1 tracking-wide">
                    Thank you for shopping with us
                </p>
                <div className="mt-4 border-t border-dashed border-gray-300" />
            </div>

            <div className="px-1 mb-3 text-sm text-gray-700">
                <p><span className="font-medium">Bill No:</span> {bill.id}</p>
                <p><span className="font-medium">Customer:</span> {bill.customer?.name}</p>
                <p><span className="font-medium">Phone:</span> {bill.customer?.phoneNumber}</p>
            </div>

            {/* Column Headers */}
            <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
                <span className="w-1/2">Item</span>
                <span className="text-center w-1/4">Qty</span>
                <span className="text-right w-1/4">Price</span>
            </div>

            <div className="border-t border-dashed border-gray-200 mb-3" />


            {/* Items */}
            <div className="space-y-2">
                {bill.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm px-1">
                        <span className="w-1/2 text-gray-700 truncate">{item.name}</span>
                        <span className="w-1/4 text-center text-gray-500">{item.quantity}</span>
                        <span className="w-1/4 text-right text-gray-800 font-medium">
                            ₹{(item.quantity * item.price).toFixed(2)}
                        </span>
                        <span>{item.customerName}</span>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="mt-5 border-t-2 border-dashed border-gray-400" />

            {/* Total */}
            <div className="flex justify-between items-center mt-4 px-1">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                    Total
                </h3>
                <h3 className="text-xl font-extrabold text-gray-900">
                    ₹{bill.total}
                </h3>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-dashed border-gray-300 pt-4 text-center">
                <p className="text-xs text-gray-400 tracking-widest uppercase">
                    * * * * * * * * * * * * * *
                </p>
                <p className="text-xs text-gray-400 mt-1">Visit Again!</p>
            </div>
        </div>
    );
});