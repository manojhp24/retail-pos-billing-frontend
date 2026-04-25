import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown, Database, SearchX } from "lucide-react";

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  error = null,
  onAdd,
  searchPlaceholder = "Search...",
}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

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
  const isEmpty = data.length === 0;
  const isNoResults = rows.length === 0;

  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-end gap-2 mb-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded text-sm outline-none focus:border-blue-500 transition-colors"
        />
        {onAdd && (
          <button
            onClick={onAdd}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Add
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-300 rounded overflow-hidden">
        <table className="w-full text-sm">

          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-300">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => {
                  const isAction = header.column.id === "actions";
                  return (
                    <th
                      key={header.id}
                      className={`px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold ${isAction ? "text-right w-[180px]" : "text-left"}`}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={`flex items-center gap-1.5 ${header.column.getCanSort() ? "cursor-pointer" : ""}`}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <ArrowUpDown size={11} className="text-gray-400" />
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
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <TableLoader colSpan={columns.length} />
            ) : isNoResults ? (
              <TableEmpty colSpan={columns.length} isEmpty={isEmpty} />
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => {
                    const isAction = cell.column.id === "actions";
                    return (
                      <td
                        key={cell.id}
                        className={`px-5 py-3 text-sm text-gray-700 ${isAction ? "text-right" : "text-left"}`}
                      >
                        {(() => {
                          const isDisplay = cell.column.columnDef.cell;

                          if (!cell.column.columnDef.accessorKey) {

                            return flexRender(cell.column.columnDef.cell, cell.getContext());
                          }

                          const value = cell.getValue();

                          if (value === null || value === undefined || value === "") {
                            return "N/A";
                          }

                          return flexRender(cell.column.columnDef.cell, cell.getContext());
                        })()}
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
      <div className="flex justify-center py-14">
        <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
      </div>
    </td>
  </tr>
);


const TableEmpty = ({ colSpan, isEmpty }) => (
  <tr>
    <td colSpan={colSpan}>
      <div className="flex flex-col items-center justify-center py-14 text-gray-400">

        {isEmpty ? (
          <>
            <Database size={28} className="mb-2 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">
              No data available
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Add new records to get started
            </p>
          </>
        ) : (
          <>
            <SearchX size={28} className="mb-2 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">
              No results found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search
            </p>
          </>
        )}

      </div>
    </td>
  </tr>
);

const PaginationInfo = ({ table, pagination, setPagination }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-gray-500">
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </span>
    <select
      value={pagination.pageSize}
      onChange={(e) => setPagination((prev) => ({ ...prev, pageSize: Number(e.target.value) }))}
      className="border border-gray-300 text-xs rounded px-2 py-1.5 outline-none bg-white"
    >
      {[5, 10, 20].map((size) => (
        <option key={size} value={size}>Show {size}</option>
      ))}
    </select>
  </div>
);

const PaginationControls = ({ table }) => (
  <div className="flex gap-1.5">
    <button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Prev
    </button>
    <button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Next
    </button>
  </div>
);

export default DataTable;