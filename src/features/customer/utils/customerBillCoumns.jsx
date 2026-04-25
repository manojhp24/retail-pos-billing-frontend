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

const customerBillColumns = () => [
    columnHelper.accessor("billId", {
        header: "Bill ID",
    }),

    columnHelper.accessor("productName", {
        header: "Product",
    }),

    columnHelper.accessor("quantity", {
        header: "Qty",
    }),

    columnHelper.accessor("price", {
        header: "Price",
    }),

    columnHelper.accessor("total", {
        header: "Total",
    }),
    columnHelper.accessor("createdAt", {
        header: "Date",
        cell: ({ getValue }) =>
            new Date(getValue()).toLocaleString(),
    }),
];
export default customerBillColumns;