import PageHeader from "@/features/shared/PageHeader";
import { useParams } from "react-router-dom";
import { useBill } from "../hooks/useBill";

export const BillDetailsPage = () => {
    const { id } = useParams();
    const { bill, loading } = useBill(id);

    if (loading) return <p className="p-5">Loading...</p>;
    if (!bill) return <p className="p-5">No data</p>;

    return (
        <>
            <PageHeader
                title={`Invoice Details`}
                description="View and print bill"
                children={<button
                    onClick={() => window.print()}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Print
                </button>}
            />

            <div className="p-5 mx-auto bg-white">

                {/* Top Section */}
                <div className="flex justify-between items-start border-b pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
                        <p className="text-sm text-gray-500 mt-1">Invoice #{bill.id}</p>
                        <p className="text-sm text-gray-500">
                            Date: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-semibold text-gray-800">Retail POS</p>
                        <p className="text-sm text-gray-500">Your Store Address</p>
                        <p className="text-sm text-gray-500">+91 9876543210</p>
                    </div>
                </div>

                {/* Customer */}
                <div className="mt-6">
                    <p className="text-xs text-gray-400 uppercase">Bill To</p>
                    <p className="font-semibold text-gray-800">{bill.customerName}</p>
                    <p className="text-sm text-gray-500">{bill.customerPhone}</p>
                </div>

                {/* Items Table */}
                <div className="mt-6">
                    <table className="w-full text-sm border border-gray-200">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">Item</th>
                                <th className="px-4 py-3 text-center">Qty</th>
                                <th className="px-4 py-3 text-right">Price</th>
                                <th className="px-4 py-3 text-right">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bill.items.map((item, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-4 py-3">{item.productName}</td>
                                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                                    <td className="px-4 py-3 text-right">₹{item.price}</td>
                                    <td className="px-4 py-3 text-right font-medium">
                                        ₹{(item.quantity * item.price).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Section */}
                <div className="mt-6 flex justify-end">
                    <div className="w-64">
                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span>₹{bill.grandTotal}</span>
                        </div>

                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-500">Tax (GST)</span>
                            <span>₹0</span>
                        </div>

                        <div className="border-t mt-2 pt-3 flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>₹{bill.grandTotal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};