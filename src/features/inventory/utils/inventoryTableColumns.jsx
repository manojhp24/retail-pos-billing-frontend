import { createColumnHelper } from "@tanstack/react-table";
import { Hash, Tag, Box, History, Clock, RefreshCcw } from "lucide-react";

const columnHelper = createColumnHelper();

const inventoryColumns = () => [
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <div
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Hash size={14} /> ID
      </div>
    ),
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <div
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Tag size={14} /> Product
      </div>
    ),
  }),
  columnHelper.accessor("stock", {
    header: ({ column }) => (
      <div
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Box size={14} /> Stock
      </div>
    ),
  }),
  columnHelper.accessor("lastUpdated", {
    header: ({ column }) => (
      <div
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Clock size={14} /> Last Updated
      </div>
    ),
  }),


  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <button className="px-3 py-1 text-xs border border-green-200 text-green-600 rounded hover:bg-green-50">
          Restock
        </button>

        <button className="px-3 py-1 text-xs border border-red-200 text-red-600 rounded hover:bg-red-50">
          Reduce
        </button>
      </div>
    ),
  })
];


export default inventoryColumns;