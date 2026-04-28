import { createColumnHelper } from "@tanstack/react-table";
import { Hash, Calendar, IndianRupee, Package } from "lucide-react";

const columnHelper = createColumnHelper();

const SortableHeader = (column, Icon, label) => (
    <div
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 cursor-pointer"
    >
        <Icon size={14} />
        {label}
    </div>
);

const customerBillColumns = (onView) => [
    columnHelper.accessor("billId", {
        header: ({ column }) => SortableHeader(column, Hash, "Bill ID"),
    }),

    columnHelper.accessor("productName", {
        header: ({ column }) => SortableHeader(column, Package, "Product"),
    }),

    columnHelper.accessor("quantity", {
        header: ({ column }) => SortableHeader(column, Package, "Qty"),
    }),

    columnHelper.accessor("price", {
        header: ({ column }) => SortableHeader(column, IndianRupee, "Price"),
    }),

    columnHelper.accessor("total", {
        header: ({ column }) => SortableHeader(column, IndianRupee, "Total"),
    }),

    columnHelper.accessor("createdAt", {
        header: ({ column }) => SortableHeader(column, Calendar, "Date"),
        cell: ({ getValue }) =>
            new Date(getValue()).toLocaleString(),
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const bill = row.original;
            return (
                <div className="flex justify-">
                    <button
                        onClick={() => onView(bill)}
                        className="px-3 py-1 text-xs border border-blue-200 text-blue-600 rounded hover:bg-blue-50"
                    >
                        View
                    </button>
                </div>
            );
        }
    })
];
export default customerBillColumns;