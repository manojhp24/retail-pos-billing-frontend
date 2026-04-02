import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const productColumns = (onEdit, onDelete) => [
    columnHelper.accessor("name", {
        header: "Name",
    }),
    columnHelper.accessor("price", {
        header: "Price",
    }),
    columnHelper.accessor("category", {
        header: "Category",
        cell: ({ getValue }) => {
            const value = getValue();

            const styles = {
                Electronics: "bg-blue-100 text-blue-600",
                Clothing: "bg-purple-100 text-purple-600",
                Food: "bg-green-100 text-green-600",
                Default: "bg-gray-100 text-gray-600",
            };

            const className = styles[value] || styles.Default;

            return (
                <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${className}`}
                >
                    {value}
                </span>
            );
        },
    }),

    columnHelper.display({
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            const item = row.original;

            return (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onEdit(item)}
                        className="px-3 py-1 text-xs border border-blue-200 text-blue-600 rounded hover:bg-blue-50"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(item.id)}
                        className="px-3 py-1 text-xs border border-red-200 text-red-600 rounded hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            );
        },
    }),
];

export default productColumns;