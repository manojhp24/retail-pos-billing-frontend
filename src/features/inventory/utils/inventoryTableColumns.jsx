import { createColumnHelper } from "@tanstack/react-table";
import { Hash, Tag, Box, Clock } from "lucide-react";

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

const inventoryColumns = (onActions) => [
  columnHelper.accessor("id", {
    header: ({ column }) => SortableHeader(column, Hash, "ID"),
  }),

  columnHelper.accessor("product", {
    header: ({ column }) => SortableHeader(column, Tag, "Product"),
  }),

  columnHelper.accessor("stock", {
    header: ({ column }) => SortableHeader(column, Box, "Stock"),
  }),

  columnHelper.accessor("lastUpdated", {
    header: ({ column }) => SortableHeader(column, Clock, "Last Updated"),
  }),

  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onActions(item, "restock")}
            className="px-3 py-1 text-xs border border-green-200 text-green-600 rounded hover:bg-green-50"
          >
            Restock
          </button>

          <button
            onClick={() => onActions(item, "reduce")}
            className="px-3 py-1 text-xs border border-red-200 text-red-600 rounded hover:bg-red-50"
          >
            Reduce
          </button>
        </div>
      );
    },
  }),
];

export default inventoryColumns;
