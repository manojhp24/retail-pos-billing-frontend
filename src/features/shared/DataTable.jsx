import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  error = null,
  onAdd,
  searchPlaceholder = "Search...",
}) => {
  // 🔹 Table state
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // 🔹 Table instance
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;

  // 🔹 States
  const isEmpty = data.length === 0;
  const isNoResults = rows.length === 0;

  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-end gap-2 mb-5">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />

        {onAdd && (
          <button
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold"
          >
            Add
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">

          {/* Header */}
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => {
                  const isAction = header.column.id === "actions";

                  return (
                    <th
                      key={header.id}
                      className={`px-6 py-3 text-[10px] uppercase tracking-wider text-gray-400 font-semibold ${isAction ? "text-right w-[180px]" : "text-left"
                        }`}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={`flex items-center gap-1.5 ${header.column.getCanSort()
                            ? "cursor-pointer"
                            : ""
                            }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {header.column.getCanSort() && (
                            <ArrowUpDown size={11} className="text-gray-300" />
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <TableLoader colSpan={columns.length} />
            ) : isNoResults ? (
              <TableEmpty colSpan={columns.length} isEmpty={isEmpty} />
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => {
                    const isAction = cell.column.id === "actions";

                    return (
                      <td
                        key={cell.id}
                        className={`px-6 py-3 text-sm text-gray-700 ${isAction ? "text-right" : "text-left"
                          }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-1">
        <PaginationInfo table={table} pagination={pagination} setPagination={setPagination} />
        <PaginationControls table={table} />
      </div>
    </>
  );
};

const TableLoader = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan}>
      <div className="flex justify-center py-16">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </td>
  </tr>
);

const TableEmpty = ({ colSpan, isEmpty }) => (
  <tr>
    <td colSpan={colSpan}>
      <div className="flex justify-center py-16 text-gray-400 text-sm">
        {isEmpty ? "No data available" : "No results found"}
      </div>
    </td>
  </tr>
);

const PaginationInfo = ({ table, pagination, setPagination }) => (
  <div className="flex items-center gap-4">
    <span className="text-xs text-gray-400">
      Page {table.getState().pagination.pageIndex + 1} of{" "}
      {table.getPageCount()}
    </span>

    <select
      value={pagination.pageSize}
      onChange={(e) =>
        setPagination((prev) => ({
          ...prev,
          pageSize: Number(e.target.value),
        }))
      }
      className="border border-gray-200 text-xs rounded-lg px-2 py-1.5"
    >
      {[5, 10, 20].map((size) => (
        <option key={size} value={size}>
          Show {size}
        </option>
      ))}
    </select>
  </div>
);

const PaginationControls = ({ table }) => (
  <div className="flex gap-2">
    <button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40"
    >
      Prev
    </button>

    <button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40"
    >
      Next
    </button>
  </div>
);

export default DataTable;