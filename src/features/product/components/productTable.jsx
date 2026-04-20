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
  Eye
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/utils/formatDateTime";

const columnHelper = createColumnHelper();

const ProductTable = ({ products, onEdit, onDelete, onAdd, loading }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = [
    columnHelper.accessor("id", {
      header: ({ column }) => (
        <div onClick={column.getToggleSortingHandler()} className="flex items-center gap-1.5 cursor-pointer">
          <Package size={13} /> ID
        </div>
      ),
    }),

    columnHelper.accessor("name", {
      header: ({ column }) => (
        <div onClick={column.getToggleSortingHandler()} className="flex items-center gap-1.5 cursor-pointer">
          <Tag size={13} /> Product
        </div>
      ),
    }),

    columnHelper.accessor("sellingPrice", {
      header: ({ column }) => (
        <div onClick={column.getToggleSortingHandler()} className="flex items-center gap-1.5 cursor-pointer">
          <IndianRupee size={13} /> Selling Price
        </div>
      ),
      cell: (info) => (
        <span className="text-gray-800 font-semibold">
          ₹{info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("category", {
      header: ({ column }) => (
        <div onClick={column.getToggleSortingHandler()} className="flex items-center gap-1.5 cursor-pointer">
          <Tag size={13} /> Category
        </div>
      ),
      cell: (info) => (
        <span className="px-2 py-0.5 rounded border border-gray-300 bg-gray-50 text-gray-600 text-xs font-medium">
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("createdAt", {
      header: ({ column }) => (
        <div onClick={column.getToggleSortingHandler()} className="flex items-center gap-1.5 cursor-pointer">
          <CalendarDays size={13} /> Created At
        </div>
      ),
      cell: ({ getValue }) => formatDateTime(getValue()),
    }),

    columnHelper.display({
      id: "profit",
      header: "Profit",
      cell: ({ row }) => {
        const cost = row.original.costPrice || 0;
        const sell = row.original.sellingPrice || 0;
        const profit = sell - cost;
        return (
          <span className="text-gray-700 font-medium">
            ₹{profit}
          </span>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1.5">
          <button
            onClick={() => onEdit(row.original)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Pencil size={12} /> Edit
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={12} /> Delete
          </button>
          <button
            onClick={() => navigate(`/products/${row.original.id}`)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Eye size={12} /> View
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: products || [],
    columns,
    state: { sorting, globalFilter, pagination },
    initialState: { pagination: { pageSize: 5 } },
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
      {/* Search + Add */}
      <div className="flex gap-2 justify-end mb-4">
        <input
          placeholder="Search products..."
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border border-gray-300 bg-white text-sm text-gray-700 placeholder-gray-400 px-3 py-2 rounded outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={onAdd}
          className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-300 rounded overflow-hidden">
        <table className="w-full text-sm">

          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500 ${header.column.id === "actions" ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={header.column.getCanSort() ? "cursor-pointer flex items-center gap-1.5" : ""}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <ArrowUpDown size={11} className="text-gray-400" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center py-14">
                    <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
                  </div>
                </td>
              </tr>
            ) : noProducts ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-14 text-gray-400">
                    <PackageX size={36} className="mb-2 opacity-40" />
                    <p className="text-sm">No products available</p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-3 text-gray-700 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <select
            value={pagination.pageSize}
            onChange={(e) => setPagination((prev) => ({ ...prev, pageSize: Number(e.target.value) }))}
            className="border border-gray-300 text-gray-600 text-xs rounded px-2 py-1.5 outline-none cursor-pointer bg-white"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>Show {size}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductTable;