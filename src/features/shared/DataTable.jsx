import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

const DataTable = ({ data, loading, error, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const isEmpty = data.length === 0;


  const table = useReactTable({
    data: data || [],
    columns: columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;

  const isFilteredEmpty = rows.length === 0;

  return (
    <>
      <div className="flex gap-2 justify-end mb-5">
        <input
          type="text"
          className="border px-3 py-2 rounded"
          placeholder="Search inventory...."
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded ">
          Add
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-4 font-semibold   ${header.column.id === "actions"
                      ? "text-right w-[180px]"
                      : "text-left"
                      }`}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer flex items-center gap-2"
                            : "flex items-center gap-2"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.getCanSort() && (
                          <ArrowUpDown size={12} />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>


          <tbody className="divide-y divide-gray-100">
            {isFilteredEmpty ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-gray-500">
                  {isEmpty ? "No inventory available" : "No results found"}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-6 py-4 ${cell.column.id === "actions" ? "text-right" : "text-left"
                        }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
