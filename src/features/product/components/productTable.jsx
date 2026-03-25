import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Pencil,
  Trash2,
  Package,
  Tag,
  IndianRupee,
  CalendarDays,
  PackageX,
  ArrowUpDown,
} from "lucide-react";
import { useState } from "react";

const columnHelper = createColumnHelper();

const ProductTable = ({ products, onEdit, onDelete, onAdd, loading }) => {
  const [sorting, setSorting] = useState();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = [
    columnHelper.accessor("id", {
      header: ({ column }) => (
        <div
          onClick={column.getToggleSortingHandler()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Package size={14} /> ID
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

    columnHelper.accessor("price", {
      header: ({ column }) => (
        <div
          onClick={column.getToggleSortingHandler()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <IndianRupee size={14} /> Price
        </div>
      ),
      cell: (info) => `₹${info.getValue()}`,
    }),

    columnHelper.accessor("category", {
      header: ({ column }) => (
        <div
          onClick={column.getToggleSortingHandler()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Tag size={14} /> Category
        </div>
      ),
    }),

    columnHelper.accessor("createdAt", {
      header: ({ column }) => (
        <div
          onClick={column.getToggleSortingHandler()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CalendarDays size={14} /> Created At
        </div>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(row.original)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-blue-200 text-blue-600 hover:bg-blue-50 transition"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={() => onDelete(row.original.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: products || [],
    columns,

    state: {
      sorting,
      globalFilter,
      pagination,
    },

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const noProducts = !products || products.length === 0;

  return (
    <>
      <div className="flex gap-2 justify-end mb-5">
        <input
          placeholder="Search..."
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={onAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          {/* Header */}

          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-4 font-semibold ${
                      header.column.id === "actions"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer flex items-center gap-2"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      <ArrowUpDown size={12} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center py-16 w-full">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr>
            ) : noProducts ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    <PackageX size={42} className="mb-3 opacity-60" />
                    <p className="text-sm font-medium">No products available</p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex gap-5">
          <div className="text-sm text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }))
            }
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
