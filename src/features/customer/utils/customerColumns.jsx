import { createColumnHelper } from "@tanstack/react-table";
import { Hash, User, Phone } from "lucide-react";

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

const customerColumns = (onView) => [
  columnHelper.accessor("id", {
    header: ({ column }) => SortableHeader(column, Hash, "ID"),
  }),

  columnHelper.accessor("name", {
    header: ({ column }) => SortableHeader(column, User, "Customer"),
  }),

  columnHelper.accessor("phone", {
    header: ({ column }) => SortableHeader(column, Phone, "Phone"),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex justify-">
          <button
            onClick={() => onView(customer)}
            className="px-3 py-1 text-xs border border-blue-200 text-blue-600 rounded hover:bg-blue-50"
          >
            View
          </button>
        </div>
      );
    },
  }),
];

export default customerColumns;
